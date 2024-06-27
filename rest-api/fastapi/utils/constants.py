import os

class Constants:
  ENV                       = os.environ.get('ENV')
  FILE_HOST                 = os.environ.get('FILE_HOST')
  TMP_DIR                   = "tmp" if os.environ.get('ENV') == "local" else "/tmp"
  AWS_REASION               = "ap-northeast-1"
  AWS_COGNITO_USER_POOL_ID  = os.environ.get('AWS_COGNITO_USER_POOL_ID')
  AWS_COGNITO_CLIENT_ID     = os.environ.get('AWS_COGNITO_CLIENT_ID')
  AWS_S3_BUCKET_NAME        = f"connected-ocr-simple-{os.environ.get('ENV')}-app"