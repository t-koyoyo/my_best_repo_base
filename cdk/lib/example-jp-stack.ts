import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { Nextjs } from 'cdk-nextjs-standalone';

import { CodeCiCd } from './components/code-ci-cd';
import { Iot } from './components/iot';

export class ExampleJPStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ------------------------------------
    // CDK Config
    // ------------------------------------
    const env                     = this.node.tryGetContext('ENV');
    // const stepCheckExistEcrImage  = this.node.tryGetContext(env)?.StepCheckExistEcrImage;
    // const cloudFrontDistributionId = this.node.tryGetContext(env)?.CloudFrontDistributionId;
    // let applicationHost = "";
    // if (env == "staging") applicationHost     = "sogra-ocr.com";
    // if (env == "production") applicationHost  = "argos-ocr.com";

    // CodeCiCd
    new CodeCiCd(this, 'CodeCiCdConstruct', { env: env });

    // Iot
    new Iot(this, 'IotConstruct', { env: env });



    // ------------------------------------
    // IAM Role
    // ------------------------------------
    // const roleForCodeBuild  = new cdk.aws_iam.Role(this, 'RoleForCodeBuild', {
    //   assumedBy: new cdk.aws_iam.ServicePrincipal('codebuild.amazonaws.com'),
    //   managedPolicies: [
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeBuildAdminAccess'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeCommitFullAccess'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCloudFormationFullAccess'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayAdministrator'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryFullAccess'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMReadOnlyAccess'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('IAMFullAccess'),
    //   ],
    //   inlinePolicies: {
    //     'CodeBuildPolicy': new cdk.aws_iam.PolicyDocument({
    //       statements: [
    //         new cdk.aws_iam.PolicyStatement({
    //           actions: [
    //             'iam:PassRole',
    //             'lambda:*',
    //           ],
    //           resources: ['*'],
    //         }),
    //       ],
    //     }),
    //   },
    // });
    // const roleForLambda     = new cdk.aws_iam.Role(this, 'RoleForLambda', {
    //   assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
    //   managedPolicies: [
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole'),
    //   ],
    //   inlinePolicies: {
    //     'LambdaPolicy': new cdk.aws_iam.PolicyDocument({
    //       statements: [
    //         new cdk.aws_iam.PolicyStatement({
    //           actions: [
    //             "cognito-idp:*",
    //             "s3:*",
    //             "s3express:*",
    //             "ses:*",
    //           ],
    //           resources: ['*'],
    //         }),
    //       ],
    //     }),
    //   },
    // });

    // ------------------------------------
    // SSM Parameter
    // ------------------------------------
    // const ssmParameterCognitoClientSecret = cdk.aws_ssm.StringParameter.fromStringParameterAttributes(this, 'SsmCognitoClientSecret', {
    //   parameterName: `/connected-ocr-simple/${env}/cognito/client-secret`,
    // });

    // ------------------------------------
    // Elastic Container Registry
    // ------------------------------------
    // const ecrRepositoryApi = new cdk.aws_ecr.Repository(this, 'EcrRepositoryAPI', {
    //   repositoryName: `connected-ocr-simple-${env}-api`,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });
    // ecrRepositoryApi.addLifecycleRule({ tagPrefixList: ['latest'], maxImageCount: 1 });
    // ecrRepositoryApi.addLifecycleRule({ maxImageAge: cdk.Duration.days(3) });

    // ------------------------------------
    // S3
    // ------------------------------------
    // const s3BucketForApp = new cdk.aws_s3.Bucket(this, 'S3BucketForApp', {
    //   bucketName: `connected-ocr-simple-${env}-app`,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });
    // const s3BucketForDeploy = new cdk.aws_s3.Bucket(this, 'S3BucketForDeploy', {
    //   bucketName: `connected-ocr-simple-${env}-deploy`,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });
    // s3BucketForDeploy.addLifecycleRule({enabled: true, expiration: cdk.Duration.days(10)});
    // const s3BucketForLogs = new cdk.aws_s3.Bucket(this, 'S3BucketForLogs', {
    //   bucketName: `connected-ocr-simple-${env}-logs`,
    //   accessControl: cdk.aws_s3.BucketAccessControl.LOG_DELIVERY_WRITE,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });
    // s3BucketForLogs.addLifecycleRule({enabled: true, expiration: cdk.Duration.days(30)});

    // ------------------------------------
    // Cognito
    // ------------------------------------
    // const cognitoUserPool = new cdk.aws_cognito.UserPool(this, 'CognitoUserPool', {
    //   accountRecovery: cdk.aws_cognito.AccountRecovery.EMAIL_ONLY,
    //   passwordPolicy: {
    //     minLength: 6,
    //     requireLowercase: false,
    //     requireDigits: false,
    //     requireSymbols: false,
    //     requireUppercase: false,
    //   },
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   signInAliases: { username: true, email: true },
    //   signInCaseSensitive: false,
    //   standardAttributes: {
    //     fullname: { required: true, mutable: true },
    //   },
    //   userInvitation: {
    //     emailSubject: 'Amano タイムカード読み取り ユーザ登録',
    //     emailBody: (
    //       "タイムカード読み取りシステムのユーザ登録を行いました。<br/>" +
    //       "<br/>" +
    //       " ユーザ名: {username}<br/>" +
    //       " パスワード: {####}<br/>" +
    //       "<br/>" +
    //       "初回ログイン時にパスワードを変更してください。<br/>" +
    //       "<br/>" +
    //       `(スマホ専用) https://${applicationHost}/<br/>` +
    //       "<br/>" +
    //       "問い合わせ先：<br/>" +
    //       " イノベーション開発本部  下郡信宏<br/>" +
    //       " nobuhiro_shimogoori@amano.co.jp<br/>" +
    //       " 内線: 5462<br/>"
    //     )
    //   },
    //   userPoolName: `connected-ocr-simple-${env}`,
    // });
    // const cognitoUserPoolClient = cognitoUserPool.addClient('CognitoClient', {
    //   userPoolClientName: `connected-ocr-simple-${env}`,
    //   generateSecret: true,
    //   authFlows: { custom: false, userSrp: true },
    //   preventUserExistenceErrors: true,
    //   oAuth: {
    //     flows: { authorizationCodeGrant: true },
    //     scopes: [cdk.aws_cognito.OAuthScope.EMAIL, cdk.aws_cognito.OAuthScope.OPENID, cdk.aws_cognito.OAuthScope.PHONE],
    //     callbackUrls: [`https://${applicationHost}/api/auth/callback/cognito`, `http://localhost:3000/api/auth/callback/cognito`],
    //     logoutUrls: [`https://${applicationHost}`, `http://localhost:3000`],
    //   },
    // });
    // const cfnUserPool = cognitoUserPool.node.defaultChild as cdk.aws_cognito.CfnUserPool;
    // cfnUserPool.emailConfiguration = {
    //   emailSendingAccount: 'DEVELOPER',
    //   from: `Timecard_Reader <Timecard_Reader@${applicationHost}>`,
    //   sourceArn: `arn:aws:ses:ap-northeast-1:827526631287:identity/Timecard_Reader@${applicationHost}`,
    // };
    // const cognitoIdPool = new cdk.aws_cognito.CfnIdentityPool(this, 'CognitoIdPool', {
    //   identityPoolName: `connected-ocr-simple-${env}`,
    //   allowUnauthenticatedIdentities: true,
    //   cognitoIdentityProviders: [{
    //     clientId: cognitoUserPoolClient.userPoolClientId,
    //     providerName: cognitoUserPool.userPoolProviderName,
    //   }],
    // });
    // /** Cognito Identity PoolにCognito User Poolを認証プロバイダーとして追加 */
    // const roleForCognitoIdPool  = new cdk.aws_iam.Role(this, 'RoleForCognitoIdPool', {
    //   assumedBy: new cdk.aws_iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
    //     "StringEquals": { "cognito-identity.amazonaws.com:aud": cognitoIdPool.attrId },
    //     "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "unauthenticated" },
    //   }, "sts:AssumeRoleWithWebIdentity"),
    //   managedPolicies: [
    //     cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonCloudWatchRUMFullAccess'),
    //   ],
    // });
    // new cdk.aws_cognito.CfnIdentityPoolRoleAttachment(this, 'CognitoIdPoolRoleAttachment', {
    //   identityPoolId: cognitoIdPool.attrId,
    //   roles: {
    //     'unauthenticated': roleForCognitoIdPool.roleArn,
    //   },
    // });

    // ------------------------------------
    // CloudWatch RUM
    // ------------------------------------
    // const cloudWtachRum = new cdk.aws_rum.CfnAppMonitor(this, 'CloudWtachRum', {
    //   domain: applicationHost,
    //   name: `connected-ocr-simple-${env}`,
    //   appMonitorConfiguration: {
    //     allowCookies: true,
    //     enableXRay: true,
    //     excludedPages: [],
    //     favoritePages: ['/'],
    //     identityPoolId: cognitoIdPool.attrId,
    //     sessionSampleRate: 1.0,
    //     telemetries: ['errors', 'performance', 'http'],
    //   },
    //   customEvents: {
    //     status: 'ENABLED',
    //   },
    //   cwLogEnabled: false,
    // });

    // ------------------------------------
    // Simple Notification Service
    // ------------------------------------
    // const snsTopic = new cdk.aws_sns.Topic(this, 'SnsTopic', {
    //   topicName: `connected-ocr-simple-${env}`,
    //   displayName: `connected-ocr-simple-${env}`,
    // });
    // new cdk.aws_sns.Subscription(this, 'SnsSubscription', {
    //   topic: snsTopic,
    //   protocol: cdk.aws_sns.SubscriptionProtocol.EMAIL,
    //   endpoint: 'tanaka.koyoyo@gmail.com',
    // });

    // ------------------------------------
    // CloudWatch Alarm
    // ------------------------------------
    // if (cloudFrontDistributionId=="") return;
    // const cloudWatchAlermRumJsErrorCount = new cdk.aws_cloudwatch.Alarm(this, 'CloudWatchAlermRumJsErrorCount', {
    //   alarmName: `connected-ocr-simple-${env}-CloudWatchAlermRumJsErrorCount`,
    //   metric: new cdk.aws_cloudwatch.Metric({
    //     namespace: 'AWS/RUM',
    //     metricName: 'JsErrorCount',
    //     dimensionsMap: {
    //       "application_name": `connected-ocr-simple-${env}`,
    //     },
    //     statistic: 'sum',
    //     period: cdk.Duration.minutes(5),
    //   }),
    //   comparisonOperator: cdk.aws_cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
    //   threshold: 1,
    //   evaluationPeriods: 1,
    // });
    // cloudWatchAlermRumJsErrorCount.addAlarmAction(new cdk.aws_cloudwatch_actions.SnsAction(snsTopic));

    // ------------------------------------
    // CodeCommit Repository
    // ------------------------------------
    // const codeCommitRepository = cdk.aws_codecommit.Repository.fromRepositoryName(this, 'CodeCommitRepository', 'connected-ocr-simple');

    // ------------------------------------
    // CodeBuild
    // ------------------------------------
    // const codeBuildProject = new cdk.aws_codebuild.Project(this, 'CodeBuildProject', {
    //   projectName: `connected-ocr-simple-${env}`,
    //   role: roleForCodeBuild,
    //   source: cdk.aws_codebuild.Source.codeCommit({
    //     repository: codeCommitRepository,
    //     branchOrRef: `refs/heads/${env}`,
    //   }),
    //   environment: {
    //     buildImage: cdk.aws_codebuild.LinuxBuildImage.STANDARD_7_0,
    //     privileged: true,
    //     environmentVariables: {
    //       'ENV' : { value: `${env}` },
    //     },
    //   },
    // });

    // ------------------------------------
    // CodePipeline
    // ------------------------------------
    // new cdk.aws_codepipeline.Pipeline(this, 'CodePipeline', {
    //   pipelineName: `connected-ocr-simple-${env}`,
    //   restartExecutionOnUpdate: true,
    //   artifactBucket: s3BucketForDeploy,
    //   stages: [
    //     {
    //       stageName: 'Source',
    //       actions: [
    //         new cdk.aws_codepipeline_actions.CodeCommitSourceAction({
    //           actionName: 'CodeCommit',
    //           repository: codeCommitRepository,
    //           branch: `${env}`,
    //           output: new cdk.aws_codepipeline.Artifact('SourceArtifact'),
    //         }),
    //       ],
    //     }, {
    //       stageName: 'Build',
    //       actions: [
    //         new cdk.aws_codepipeline_actions.CodeBuildAction({
    //           actionName: 'CodeBuild',
    //           project: codeBuildProject,
    //           input: new cdk.aws_codepipeline.Artifact('SourceArtifact'),
    //           outputs: [
    //             new cdk.aws_codepipeline.Artifact('BuildArtifact'),
    //           ],
    //         }),
    //       ],
    //     },
    //   ],
    // });

    // -------------------------------------------------
    // !!!!!!! 以下は ECR Image が必須となるリソース !!!!!!!
    // -------------------------------------------------
    // if (!stepCheckExistEcrImage) return;

    // ------------------------------------
    // Lambda（from ECR）
    // ------------------------------------
    // const lambdaFunction = new cdk.aws_lambda.DockerImageFunction(this, 'LambdaFunction', {
    //   functionName: `connected-ocr-simple-${env}-api`,
    //   code: cdk.aws_lambda.DockerImageCode.fromEcr(ecrRepositoryApi, {cmd: ["main.handler"]}),
    //   timeout: cdk.Duration.seconds(900),
    //   memorySize: 2048,
    //   role: roleForLambda,
    //   environment: {
    //     ENV                     : env,
    //     FILE_HOST               : `https://${applicationHost}/files`,
    //     AWS_COGNITO_USER_POOL_ID: cognitoUserPool.userPoolId,
    //     AWS_COGNITO_CLIENT_ID   : cognitoUserPoolClient.userPoolClientId,
    //   },
    // });
    // const lambdaFunctionAlias = lambdaFunction.addAlias('provisioned', {provisionedConcurrentExecutions: 1});

    // ------------------------------------
    // API Gateway
    // ------------------------------------
    // const apiGateway = new cdk.aws_apigateway.LambdaRestApi(this, 'ApiGateway', {
    //   restApiName: `connected-ocr-simple-${env}-api`,
    //   handler: lambdaFunctionAlias,
    //   proxy: true,
    //   deployOptions: {
    //     stageName: 'back-api',
    //     loggingLevel: cdk.aws_apigateway.MethodLoggingLevel.INFO,
    //     dataTraceEnabled: true,
    //     metricsEnabled: true,
    //   },
    //   binaryMediaTypes: ['multipart/form-data'],
    // });

    // ------------------------------------
    // Front-End ※ SSTを使用してNextJSをサーバーレスで構築する
    //  -> 生成されるサービス：CloudFront, S3, Lambda
    //  -> https://open-next.js.org/
    //  -> https://constructs.dev/packages/cdk-nextjs-standalone/v/4.0.0-beta.20?lang=typescript
    // ------------------------------------
    // let customSslCertificateArn = "";
    // if (env == "staging")    customSslCertificateArn = "arn:aws:acm:us-east-1:827526631287:certificate/7bdbbb35-6b22-4596-a4a8-b65f0862ccaa";
    // if (env == "production") customSslCertificateArn = "arn:aws:acm:us-east-1:827526631287:certificate/5ec6de77-72cc-44fa-a0e6-ce42f80ea34a";
    // const cloudFrontOriginAccessIdentity = new cdk.aws_cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity')
    // const nextjs = new Nextjs(this, 'Web', {
    //   environment: {
    //     SHARP_VERSION                     : "0.32.6",
    //     NEXT_PUBLIC_ENV                   : env,
    //     NEXT_PUBLIC_ARUM_APP_ID           : cloudWtachRum.attrId,
    //     NEXT_PUBLIC_ARUM_GUEST_ROLE_ARN   : roleForCognitoIdPool.roleArn,
    //     NEXT_PUBLIC_ARUM_IDENTITY_POOL_ID : cognitoIdPool.attrId,

    //     AUTH_COGNITO_HOST             : `https://auth.${applicationHost}`,
    //     AUTH_COGNITO_CLIENT_ID        : `${cognitoUserPoolClient.userPoolClientId}`,
    //     AUTH_COGNITO_CLIENT_SECRET    : ssmParameterCognitoClientSecret.stringValue,
    //     AUTH_COGNITO_ISSUER           : `https://cognito-idp.ap-northeast-1.amazonaws.com/${cognitoUserPool.userPoolId}`,
    //     AUTH_COGNITO_LOGOUT_URL       : `https://auth.${applicationHost}/logout`,
    //     NEXT_PUBLIC_APP_HOST          : `https://${applicationHost}`,
    //     NEXT_PUBLIC_API_HOST          : `https://${applicationHost}/back-api`,
    //     NEXTAUTH_SECRET               : "2axn0v0fbM9jEAnvBiBWoumv5+kF6yElo+0Hjo1APTY=",
    //     NEXTAUTH_URL                  : `https://${applicationHost}`,
    //     COGNITO_ID_POOL               : cognitoIdPool.attrId,
    //     COGNITO_ID_GUEST_ROLE_ARN     : roleForCognitoIdPool.roleArn,
    //   },
    //   overrides: {
    //     nextjs: {
    //       nextjsServerProps: {
    //         environment: {
    //           NEXT_PUBLIC_ENV               : env,

    //           AUTH_COGNITO_HOST             : `https://auth.${applicationHost}`,
    //           AUTH_COGNITO_CLIENT_ID        : `${cognitoUserPoolClient.userPoolClientId}`,
    //           AUTH_COGNITO_CLIENT_SECRET    : ssmParameterCognitoClientSecret.stringValue,
    //           AUTH_COGNITO_ISSUER           : `https://cognito-idp.ap-northeast-1.amazonaws.com/${cognitoUserPool.userPoolId}`,
    //           AUTH_COGNITO_LOGOUT_URL       : `https://auth.${applicationHost}/logout`,
    //           NEXT_PUBLIC_APP_HOST          : `https://${applicationHost}`,
    //           NEXT_PUBLIC_API_HOST          : `https://${applicationHost}/back-api`,
    //           NEXTAUTH_SECRET               : "2axn0v0fbM9jEAnvBiBWoumv5+kF6yElo+0Hjo1APTY=",
    //           NEXTAUTH_URL                  : `https://${applicationHost}`,
    //           COGNITO_ID_POOL               : cognitoIdPool.attrId,
    //           COGNITO_ID_GUEST_ROLE_ARN     : roleForCognitoIdPool.roleArn,
    //         }
    //       }
    //     },
    //     nextjsDistribution: {
    //       distributionProps: {
    //         comment: `connected-ocr-simple-${env}`,
    //         domainNames: [applicationHost],
    //         certificate: cdk.aws_certificatemanager.Certificate.fromCertificateArn(this, 'Certificate', customSslCertificateArn),
    //         priceClass: cdk.aws_cloudfront.PriceClass.PRICE_CLASS_200,
    //         webAclId: "arn:aws:wafv2:us-east-1:827526631287:global/webacl/common-waf-for-cloudfront/70e96cfd-de27-418a-b4b2-0a1d546cfbf1",
    //         logBucket: s3BucketForLogs,
    //         logIncludesCookies: true,
    //         additionalBehaviors: {
    //           "/back-api/*": {
    //             origin: new cdk.aws_cloudfront_origins.HttpOrigin(`${apiGateway.restApiId}.execute-api.ap-northeast-1.amazonaws.com`, {
    //               customHeaders: { 'x-cf-security-flag': 'true' },
    //               originShieldEnabled: false,
    //               originSslProtocols: [cdk.aws_cloudfront.OriginSslPolicy.TLS_V1_2],
    //               protocolPolicy: cdk.aws_cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
    //             }),
    //             allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_ALL,
    //             cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_DISABLED,
    //             originRequestPolicy: cdk.aws_cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
    //             viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
    //           },
    //           "/files/*": {
    //             origin: new cdk.aws_cloudfront_origins.S3Origin(s3BucketForApp, {
    //               originAccessIdentity: cloudFrontOriginAccessIdentity,
    //               originShieldEnabled: false,
    //             }),
    //             allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_ALL,
    //             viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
    //           },
    //         }
    //       },
    //       imageResponseHeadersPolicyProps: {
    //         comment: `connected-ocr-simple-${env}`,
    //       }
    //     },
    //     nextjsStaticAssets: {
    //       bucketProps: {
    //         bucketName: `connected-ocr-simple-${env}-web-assets`,
    //         removalPolicy: cdk.RemovalPolicy.DESTROY,
    //       },
    //       nextjsBucketDeploymentProps: {
    //         prune: true,
    //       },
    //     }
    //   },
    //   nextjsPath: '../web',
    //   skipBuild: false,
    // });
    // new cdk.CfnOutput(this, "CloudFrontDistributionDomain", {
    //   value: nextjs.distribution.distributionDomain,
    // });

    // ------------------------------------
    // S3
    // ------------------------------------
    // s3BucketForApp.addToResourcePolicy(new cdk.aws_iam.PolicyStatement({
    //   effect    : cdk.aws_iam.Effect.ALLOW,
    //   principals: [new cdk.aws_iam.CanonicalUserPrincipal(cloudFrontOriginAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
    //   actions   : ['s3:GetObject'],
    //   resources : [s3BucketForApp.arnForObjects("*")],
    // }));

    // ------------------------------------
    // Waf（Web Application Firewall）
    // ------------------------------------
    // const wafAssociationApi = new cdk.aws_wafv2.CfnWebACLAssociation(this, 'WafAssociationApi', {
    //   resourceArn: `arn:aws:apigateway:ap-northeast-1::/restapis/${apiGateway.restApiId}/stages/back-api`,
    //   webAclArn: 'arn:aws:wafv2:ap-northeast-1:827526631287:regional/webacl/common-waf-for-resources/f2291e18-9bb0-481b-a413-d978b64cc95d'
    // });
    // wafAssociationApi.node.addDependency(apiGateway);

    // -------------------------------------------------
    // !!!!!!! 以下は Cloud Front が必須となるリソース !!!!!!!
    // -------------------------------------------------
    // if (cloudFrontDistributionId=="") return;

    // ------------------------------------
    // Cognito Custom Domain
    // ------------------------------------
    // let customAuthSslCertificateArn = "";
    // if (env == "staging")    customAuthSslCertificateArn = "arn:aws:acm:us-east-1:827526631287:certificate/4c020ed2-bba9-4093-aa00-b04f59794dba";
    // if (env == "production") customAuthSslCertificateArn = "arn:aws:acm:us-east-1:827526631287:certificate/a24e23da-9886-4173-b725-e338e862f3de";
    // cognitoUserPool.addDomain('CognitoDomain', {
    //   customDomain: {
    //     domainName: `auth.${applicationHost}`,
    //     certificate: cdk.aws_certificatemanager.Certificate.fromCertificateArn(this, 'CertificateForAuth', customAuthSslCertificateArn),
    //   }
    // });
  }
}