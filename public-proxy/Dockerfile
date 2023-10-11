# Use an official Ubuntu image as the base image
FROM ubuntu:latest

# Update the package list and install Nginx
RUN apt-get update && apt-get install -y nginx \
    python-is-python3 python3-pip \
    curl \
    wget \
    git \
    vim \
    nano \
    unzip \
    sudo \
    net-tools \
    iputils-ping \
    software-properties-common

ENV TZ Asia/Ho_Chi_Minh

# Install SSH Server
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y openssh-server

# Disable ssh with password and enable ssh with root
RUN sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# Clean up after installations
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Expose port 80 to the host
EXPOSE 80

# Expose SSH port
EXPOSE 22