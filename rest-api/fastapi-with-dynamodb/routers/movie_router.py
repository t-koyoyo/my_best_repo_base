from fastapi import APIRouter, Body, File, UploadFile
# from schemas.license_plate_schema import LicensePlateCreate

router_movie = APIRouter()

@router_movie.post(
  "",
  name            = "映画情報を新規作成",
  description     = "ユーザーのタイムカードのデータセット情報を作成するエンドポイントです。指定されたIDのタイムカードのデータセット情報を作成します。",
  # status_code     = status.HTTP_204_NO_CONTENT,
  # responses       = {
  #   status.HTTP_204_NO_CONTENT: {
  #     "description": "指定されたタイムカードの情報が正常にエクスポートされました。レスポンスボディは返されません。",
  #   },
  #   status.HTTP_401_UNAUTHORIZED          : {
  #     "description": "1000 認証に失敗しました｡",
  #     "content": {
  #       "application/json": { "example": {"code": 1000, "message": "認証に失敗しました｡", "detail": ""} }
  #     },
  #   },
  #   status.HTTP_404_NOT_FOUND             : {
  #     "description": "5000 指定されたリソースが存在しません。",
  #     "content": {
  #       "application/json": { "example": {"code": 5000, "message": "指定されたリソースが存在しません。", "detail": ""} }
  #     },
  #   },
  #   status.HTTP_500_INTERNAL_SERVER_ERROR : {
  #     "description": "4000 システムエラーが発生しました。",
  #     "content": {
  #       "application/json": { "example": {"code": 4000, "message": "システムエラーが発生しました。", "detail": ""} }
  #     },
  #   }
  # }
)
def create_movie(body : LicensePlateCreate = Body(...)):
  pass