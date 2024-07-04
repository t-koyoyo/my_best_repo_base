import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ExampleUSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ------------------------------------
    // CDK Config
    // ------------------------------------
    const env = this.node.tryGetContext('ENV');
    const cloudFrontDistributionId = this.node.tryGetContext(env)?.CloudFrontDistributionId;

    // ------------------------------------
    // Simple Notification Service
    // ------------------------------------
    const snsTopic = new cdk.aws_sns.Topic(this, 'SnsTopic', {
      topicName: `connected-ocr-simple-${env}`,
      displayName: `connected-ocr-simple-${env}`,
    });
    new cdk.aws_sns.Subscription(this, 'SnsSubscription', {
      topic: snsTopic,
      protocol: cdk.aws_sns.SubscriptionProtocol.EMAIL,
      endpoint: 'tanaka.koyoyo@gmail.com',
    });

    // ------------------------------------
    // CloudWatch Alarm
    // ------------------------------------
    if (cloudFrontDistributionId=="") return;
    const cloudWatchAlermCloudFront4xxErrorRate = new cdk.aws_cloudwatch.Alarm(this, 'CloudFront4xxErrorRate', {
      alarmName: `connected-ocr-simple-${env}-CloudFront4xxErrorRate`,
      metric: new cdk.aws_cloudwatch.Metric({
        namespace: 'AWS/CloudFront',
        metricName: '4xxErrorRate',
        dimensionsMap: {
          "Region": "Global",
          "DistributionId": cloudFrontDistributionId
        },
        statistic: 'Average',
        period: cdk.Duration.minutes(5),
      }),
      comparisonOperator: cdk.aws_cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      threshold: 1,
      evaluationPeriods: 1,
    });
    cloudWatchAlermCloudFront4xxErrorRate.addAlarmAction(new cdk.aws_cloudwatch_actions.SnsAction(snsTopic));
    const cloudWatchAlermCloudFront5xxErrorRate = new cdk.aws_cloudwatch.Alarm(this, 'CloudFront5xxErrorRate', {
      alarmName: `connected-ocr-simple-${env}-CloudFront5xxErrorRate`,
      metric: new cdk.aws_cloudwatch.Metric({
        namespace: 'AWS/CloudFront',
        metricName: '5xxErrorRate',
        dimensionsMap: {
          "Region": "Global",
          "DistributionId": cloudFrontDistributionId
        },
        statistic: 'Average',
        period: cdk.Duration.minutes(5),
      }),
      comparisonOperator: cdk.aws_cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      threshold: 1,
      evaluationPeriods: 1,
    });
    cloudWatchAlermCloudFront5xxErrorRate.addAlarmAction(new cdk.aws_cloudwatch_actions.SnsAction(snsTopic));
  }
}