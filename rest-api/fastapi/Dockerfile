FROM public.ecr.aws/lambda/python:3.12

RUN yum -y update

RUN yum -y install gcc python3-devel opencv-devel git

COPY . .

RUN pip install --upgrade pip

# https://pytorch.org/get-started/locally/  ※ GPU推論用のコードは不要
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

RUN pip install -r ./requirements.txt
