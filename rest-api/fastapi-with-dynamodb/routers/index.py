from pathlib import Path
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
# from utils.constants import Constants
# from services.aws_service import AwsService
# from routers import license_plate


router_index = APIRouter()
# router_index.include_router(license_plate.router,  prefix="/license-plates",  tags=["license-plates"])


@router_index.get(
    "/health",
    name="ヘルスチェック",
    description="APIの疎通確認を行います。APIが正常に動作しているかをチェックするために使用されます。",
    responses={
        status.HTTP_200_OK: {
            "description": "APIが正常に動作していることを示します。サービスが稼働中であることを確認できます。",
            "content": {
                "application/json": {
                    "example": {"msg": "Service is working now!"}
                }
            },
        },
        status.HTTP_500_INTERNAL_SERVER_ERROR: {
            "description": "4000 システムエラーが発生しました。",
            "content": {
                "application/json": {"example": {"code": 3000, "message": "データベース処理に失敗しました。", "detail": ""}}
            },
        }
    }
)
def health():
    return JSONResponse(content={'msg': 'Service is working now!'})
