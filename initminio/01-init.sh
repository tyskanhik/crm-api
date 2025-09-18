#!/bin/bash

# Ждем пока MinIO запустится
until mc alias set myminio http://minio:9000 minioadmin minioadmin; do
  echo 'Waiting for MinIO...'
  sleep 1
done

# Ждем пока MinIO станет полностью доступен
until mc admin info myminio > /dev/null 2>&1; do
  echo 'Waiting for MinIO to be ready...'
  sleep 1
done

# Создаем бакет если не существует
if ! mc ls myminio/attachments > /dev/null 2>&1; then
  mc mb myminio/attachments
  echo 'Bucket attachments created'
  
  # Устанавливаем безопасную политику (только авторизованный доступ)
  mc anonymous set myminio/attachments
  echo 'Bucket policy set to private (authorized access only)'
fi

# Загружаем начальные файлы если они есть в ожидаемом месте
if [ -d "/init-data/images" ]; then
  mc cp --recursive /init-data/images/ myminio/attachments/
  echo 'Initial files uploaded to MinIO'
fi

echo 'MinIO initialization completed'