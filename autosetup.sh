#!/bin/bash

# config ssh
cp public-proxy/ssh-key/id_rsa.pub public-proxy/.ssh/authorized_keys

# config permission
chown -R root:root public-proxy
chmod -R 755 public-proxy
chmod -R 750 public-proxy/ssh-key/
chmod 640 public-proxy/ssh-key/*
chmod -R 750 public-proxy/.ssh
chmod 640 public-proxy/.ssh/*
chown -R root:root public-proxy/site-enabled
chmod 644 public-proxy/site-enabled/service.conf

# config permission volumn file
# chmod 755 -R backend/frontend-dist/ backend/secret_check/ backend/secret_dir/ backend/src/files/ backend/php-src/cv-editor/files/ backend/php-src/image-sharing/file_contents/
chown -R root:root backend/
chmod -R 755 backend/
chmod -R 777 backend/src/files
chmod -R 777 backend/.run
chmod -R 777 backend/secret_dir
chmod -R 777 backend/secret_check
chmod -R 777 backend/php-src/cv-editor/files
chmod -R 755 flag
rm -rf .data

docker-compose up -d