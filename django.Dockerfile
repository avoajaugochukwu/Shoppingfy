# syntax=docker/dockerfile:1

FROM python:3.8-slim
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /code


COPY requirements.txt /code/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r requirements.txt

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "cumba_bikes.wsgi:application"]

COPY . /code/