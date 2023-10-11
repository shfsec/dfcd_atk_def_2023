FROM php:8.2-apache

RUN apt-get update -y && apt install -y tzdata
ENV TZ Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo_mysql && docker-php-ext-enable pdo_mysql

RUN apt update -y && apt install -y libonig-dev  && docker-php-ext-install mbstring && docker-php-ext-enable mbstring

RUN docker-php-ext-install pdo && docker-php-ext-enable pdo

RUN cd /tmp/ && curl -OL http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.0g-2ubuntu4_amd64.deb && dpkg -i libssl1.1_1.1.0g-2ubuntu4_amd64.deb
RUN apt update -y && apt install -y libx11-6 libxext6 libfreetype6 libfontconfig1 libxrender1 libjpeg62-turbo

RUN curl -L -o /proxy https://github.com/vinhjaxt/tcp-proxy/releases/download/ActionBuild_x86_64-unknown-linux-gnu_2023.08.08_02-10-50/tcp-unix-x86_64-unknown-linux-gnu && chmod +x /proxy
