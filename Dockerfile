# syntax=docker/dockerfile:1

FROM python:3.8-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN /usr/local/bin/python -m pip install --upgrade pip
# RUN sudo apt-get update && sudo apt-get install -y libmagic-dev
RUN pip install -r requirements.txt
COPY . /code/