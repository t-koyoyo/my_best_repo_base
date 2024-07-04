import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * CI/CD関連リソースのコンストラクタ
 * @resources IAM Role
 * @resources S3 Bucket
 * @resources CodeCommit
 * @resources CodeBuild
 * @resources CodePipeline
 * @props env 環境名
 */
export class CodeCiCd extends Construct {
  constructor(scope: Construct, id: string, props: { env: string }) {
    super(scope, id);

    // ------------------------------------
    // IAM Role
    // ------------------------------------
    const roleForCodeBuild  = new cdk.aws_iam.Role(this, 'RoleForCodeBuild', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('codebuild.amazonaws.com'),
      managedPolicies: [
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeBuildAdminAccess'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeCommitFullAccess'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCloudFormationFullAccess'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayAdministrator'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryFullAccess'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMReadOnlyAccess'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('IAMFullAccess'),
      ],
      inlinePolicies: {
        'CodeBuildPolicy': new cdk.aws_iam.PolicyDocument({
          statements: [
            new cdk.aws_iam.PolicyStatement({
              actions: [
                'iam:PassRole',
                'lambda:*',
              ],
              resources: ['*'],
            }),
          ],
        }),
      },
    });

    // ------------------------------------
    // S3
    // ------------------------------------
    const s3BucketForDeploy = new cdk.aws_s3.Bucket(this, 'S3BucketForDeploy', {
      bucketName: `tibit-${props.env}-deploy`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    s3BucketForDeploy.addLifecycleRule({enabled: true, expiration: cdk.Duration.days(10)});

    // ------------------------------------
    // CodeCommit Repository
    // ------------------------------------
    const codeCommitRepository = cdk.aws_codecommit.Repository.fromRepositoryName(this, 'CodeCommitRepository', 'tibit');

    // ------------------------------------
    // CodeBuild
    // ------------------------------------
    const codeBuildProject = new cdk.aws_codebuild.Project(this, 'CodeBuildProject', {
      projectName: `tibit-${props.env}`,
      role: roleForCodeBuild,
      source: cdk.aws_codebuild.Source.codeCommit({
        repository: codeCommitRepository,
        branchOrRef: `refs/heads/${props.env}`,
      }),
      environment: {
        buildImage: cdk.aws_codebuild.LinuxBuildImage.STANDARD_7_0,
        privileged: true,
        environmentVariables: {
          'ENV' : { value: `${props.env}` },
        },
      },
    });

    // ------------------------------------
    // CodePipeline
    // ------------------------------------
    new cdk.aws_codepipeline.Pipeline(this, 'CodePipeline', {
      pipelineName: `tibit-${props.env}`,
      restartExecutionOnUpdate: true,
      artifactBucket: s3BucketForDeploy,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new cdk.aws_codepipeline_actions.CodeCommitSourceAction({
              actionName: 'CodeCommit',
              repository: codeCommitRepository,
              branch: `${props.env}`,
              output: new cdk.aws_codepipeline.Artifact('SourceArtifact'),
            }),
          ],
        }, {
          stageName: 'Build',
          actions: [
            new cdk.aws_codepipeline_actions.CodeBuildAction({
              actionName: 'CodeBuild',
              project: codeBuildProject,
              input: new cdk.aws_codepipeline.Artifact('SourceArtifact'),
              outputs: [
                new cdk.aws_codepipeline.Artifact('BuildArtifact'),
              ],
            }),
          ],
        },
      ],
    });
  }
}