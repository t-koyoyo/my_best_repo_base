"""
 * エラーレスポンスのスキーマを定義します。
 *
 * FastAPIの Schemas Practice は次の場所で入手できます。
 *   -> https://fastapi.tiangolo.com/ja/tutorial/sql-databases/#create-the-pydantic-models
 *
 * エラーレスポンス設計は次のGoogleAPI設計ドキュメントを参考に作成しています。
 *  ペイロード
 *   - code: エラーコード
 *     サービスの最も具体的なエラーコード。
 *   - message: エラーメッセージ
 *     開発者向けのエラーメッセージ。
 *   - details: エラーの詳細
 *     エラーの詳細は以下のペイロードのセットを定義します。
 *     - ErrorInfo ぺイロード
 *       - reason <string>: エラーが発生した理由の短い説明
 *     - LocalizedMessage ぺイロード
 *       - locale <string>: IETF bcp47で定義された仕様に準拠したロケール。
 *           ex) ja-JP
 *       - message <string>: 顧客が選択したサービスを通じて受け取るエラーメッセージ
 *
 * 参考元の GoogleAPI設計ドキュメント は次の場所で入手できます。
 *   -> https://google.aip.dev/193
 *   -> https://cloud.google.com/apis/design/errors?hl=ja
"""
from pydantic import BaseModel, ConfigDict


class LicensePlateBase(BaseModel):
    region        : str
    class_number  : str
    kana          : str
    serial_number : str
    color         : str


class LicensePlateCreate(LicensePlateBase):
    pass


class Error(LicensePlateBase):
    model_config = ConfigDict(populate_by_name=True)
    code: int
    message: str
    details: str
