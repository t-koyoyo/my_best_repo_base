import os

class Constants:
  ENV                = os.environ.get('ENV')
  TMP_DIR            = 'tmp' if os.environ.get('ENV') == "local" else "/tmp"
  AWS_REASION        = 'ap-northeast-1'
  AWS_S3_BUCKET_NAME = f'example-{os.environ.get('ENV')}-app'