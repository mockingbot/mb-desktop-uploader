#!/usr/bin/env bash

#UPLOADER=mb-desktop-uploader
#INPUT_PATH_PREFIX=./mb-desktop/installer
#BUCKET_CONFIG=./config.json
#VERSION=0.6.8
#LOCALE=zh

UPLOADER=$1
INPUT_PATH_PREFIX=$2
BUCKET_CONFIG=$3
VERSION=$4
LOCALE=$5

echo "[CONFIG] - UPLOADER:          ${UPLOADER}"
echo "[CONFIG] - INPUT_PATH_PREFIX: ${INPUT_PATH_PREFIX}"
echo "[CONFIG] - BUCKET_CONFIG:     ${BUCKET_CONFIG}"
echo "[CONFIG] - VERSION:           ${VERSION}"
echo "[CONFIG] - LOCALE:            ${LOCALE}"

echo "[UPLOAD] - win32 x64"
npx ${UPLOADER} -c ${BUCKET_CONFIG}\
  --upload-platform win32\
  --upload-input-path ${INPUT_PATH_PREFIX}/win32/MockingBot-win32-x64-${LOCALE}\
  --upload-version ${VERSION}\
  --upload-locale ${LOCALE}\
  --upload-arch x64
echo "- -"
echo "- -"

echo "[UPLOAD] - win32 ia32"
npx ${UPLOADER} -c ${BUCKET_CONFIG}\
  --upload-platform win32\
  --upload-input-path ${INPUT_PATH_PREFIX}/win32/MockingBot-win32-ia32-${LOCALE}\
  --upload-version ${VERSION}\
  --upload-locale ${LOCALE}\
  --upload-arch ia32
echo "- -"
echo "- -"

echo "[UPLOAD] - linux"
npx ${UPLOADER} -c ${BUCKET_CONFIG}\
  --upload-platform linux\
  --upload-input-path ${INPUT_PATH_PREFIX}/linux\
  --upload-version ${VERSION}
echo "- -"
echo "- -"

echo "[UPLOAD] - darwin"
npx ${UPLOADER} -c ${BUCKET_CONFIG}\
  --upload-platform darwin\
  --upload-input-path ${INPUT_PATH_PREFIX}/darwin\
  --upload-version ${VERSION}\
  --upload-locale ${LOCALE}
echo "- -"
echo "- -"
