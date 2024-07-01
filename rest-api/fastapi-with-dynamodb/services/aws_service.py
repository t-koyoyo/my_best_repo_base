import boto3
from utils.constants import Constants


class AwsService:

  ## ------------------------------------------------------------
  ## ◼️ Cognito
  ## ------------------------------------------------------------
  def cognito_client():
    """ Cognito > クライアントを取得する """
    return boto3.client('cognito-idp', endpoint_url="http://localstack:4566" if Constants.ENV == "local" else None)

  ## ------------------------------------------------------------
  ## ◼️ S3
  ## ------------------------------------------------------------
  def s3_client():
    """ S3 > クライアントを取得する """
    return boto3.client('s3', endpoint_url="http://localstack:4566" if Constants.ENV == "local" else None)

  ## ------------------------------------------------------------
  ## ◼️ Simple Email Service
  ## ------------------------------------------------------------
  def ses_client():
    """ SES > クライアントを取得する """
    return boto3.client('ses', endpoint_url="http://localstack:4566" if Constants.ENV == "local" else None)

  ## ------------------------------------------------------------
  ## ◼️ Simple Queue Service
  ## ------------------------------------------------------------
  def sqs_client():
    """ SQS > クライアントを取得する """
    return boto3.client('sqs', endpoint_url="http://localstack:4566" if Constants.ENV == "local" else None)

  ## ------------------------------------------------------------
  ## ◼️ SSM Parameter Store
  ## ------------------------------------------------------------
  def ssm_client():
    """ SSM Parameter Store > クライアントを取得する """
    return boto3.client('ssm', endpoint_url="http://localstack:4566" if Constants.ENV == "local" else None)
