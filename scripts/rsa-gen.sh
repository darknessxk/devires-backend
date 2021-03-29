#!/usr/bin/env sh

KEYS_PATH="$PWD/keys"
PVK="jwt.pvk"
PBK="jwt.pbk"

if [ ! -d "$KEYS_PATH" ]; then
    mkdir "$KEYS_PATH"
else
    rm -f "$KEYS_PATH/*"
fi

ssh-keygen -t rsa -b 4096 -m PEM -f "$KEYS_PATH/$PVK"
openssl rsa -in "$KEYS_PATH/$PVK" -pubout -outform PEM -out "$KEYS_PATH/$PBK"

