# Use a specific, lightweight version of Python
FROM python:3.11-slim

# Install `curl` for the healthcheck and `libpq-dev` for psycopg2
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libpq-dev \
    # gcc is needed to build some python packages
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for python for optimal container performance
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .