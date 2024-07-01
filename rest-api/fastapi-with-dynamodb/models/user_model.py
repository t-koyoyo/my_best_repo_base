"""
 * DynamoDB ユーザー情報テーブル の データの構造や関係を定義します。
 *
 * DynamoDBへのPythonインターフェースライブラリであるPynamoDBを使用します。
 *   -> https://pynamodb.readthedocs.io/en/stable/
"""
from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute
from utils.constants import Constants


class UserModel(Model):
    """
    ユーザー情報テーブルのモデルクラス
    """
    class Meta:
        table_name = f'skoll-{Constants.ENV}-user'
        region     = 'ap-northeast-1'
        host       = 'http://localstack:4566' if Constants.ENV == "local" else 'https://dynamodb.ap-northeast-1.amazonaws.com'

    # ユーザーID
    user_id = UnicodeAttribute(hash_key=True, null=False)
