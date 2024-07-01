# FastAPI with DynamoDB

## Usage

`docker-compose.yml` を以下に設定する。

```yml
services:
  api:
    container_name: example-api
    build:
      context: ./rest-api/fastapi-with-dynamodb
      dockerfile: Dockerfile
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload --log-level debug
    ports:
      - "8888:8000"
    env_file:
      - .env.local
    volumes:
      - ./rest-api/fastapi-with-dynamodb:/app
```

実装デザインパターンはリポジトリーパターン
