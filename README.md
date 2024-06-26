# My Best Repo Base

アプリ開発におけるリポジトリベースとなるフォルダ構成を作成する
以下より `README.md` の内容も参考例として記載する

-----

# Project KT

[Architecture Diagram](https://drive.google.com/file/d/XXXXX/view?usp=sharing)

## 🚀 Overview

![capture](./data/readme_capture.png)

## 🔧 Local Quickstart

次の手順に従って、独自の Connected OCR Simple インスタンスをローカルで実行します。

### 1. Clone the repo

```bash
git clone https://git-codecommit.ap-northeast-1.amazonaws.com/v1/repos/connected-ocr-simple
```

### 2. Run locally

```bash
make up
```

Frontend is [here](http://localhost:3000). Backend API is [here](http://localhost:8888). Backend API document is [here](http://localhost:8888/docs).

## 📦 References

### 0. External Links

- XXXXX:
  - [https://example.com/](https://example.com/)

### 1. Directory Structure

```bash
├── api       ... AWSリソースのIaC
├── cdk       ... AWSリソースのIaC
├── docs      ...
├── iot       ...
├── web       ... 
├── README.md ... Here
├── fuga_dir
│   ├── fuga
│   └── fugafuga
├── fugafuga.py
├── fugahoge.py
├── hoge.py
└── hoge_dir
    ├── hoge
    └── hogehoge
```

### 2. AWS CLI

```bash
## ■ AWS > S3：http://localhost:4566/connected-ocr-simple-local-app/XXX/ABCD.txt
$ awslocal s3 ls                                                       # Bucket List
$ awslocal s3 ls s3://connected-ocr-simple-local-app                   # Folder/File List
$ awslocal s3 cp s3://connected-ocr-simple-local-app/XXX/ABCD.txt .    # Download Folder/File
$ awslocal s3 cp ABCD.txt s3://connected-ocr-simple-local-app/XXX/     # Upload Folder/File
```

### 3. Docker

```bash
# ■ リモート先からホストにファイルをコピーする
$ docker --tlsverify --host tcp://$DEVICE_IP:2376 cp edge-skoll-1:/output ./output
# ■ リモート先からホストにファイルをコピーする
$ docker --tlsverify --host tcp://$DEVICE_IP:2376 exec -it edge-skoll-1 /bin/bash
```