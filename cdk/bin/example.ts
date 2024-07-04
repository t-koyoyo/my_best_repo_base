#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ExampleJPStack } from '../lib/example-jp-stack';
import { ExampleUSStack } from '../lib/example-us-stack';

const app = new cdk.App();
const env = app.node.tryGetContext('ENV')
new ExampleJPStack(app, `Example-${env[0].toUpperCase()}${env.slice(1)}`, { env: { account: '827526631287', region: 'ap-northeast-1' }});
new ExampleUSStack(app, `Example-${env[0].toUpperCase()}${env.slice(1)}`, { env: { account: '827526631287', region: 'us-east-1' }});