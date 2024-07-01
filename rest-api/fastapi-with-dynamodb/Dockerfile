FROM python:3.12.4

WORKDIR /app

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter

RUN apt -y update && apt -y upgrade

COPY . .

RUN pip install -r ./requirements.txt
