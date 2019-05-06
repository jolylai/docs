---
title: 'Ubuntu'
date: '2018-10-01'
meta_title: 'How to install & setup Ghost on Ubuntu 16.04 + 18.04'
meta_description: 'A full production install guide for how to install the Ghost professional publishing platform on a production server running Ubuntu 16.04 or 18.04.'
keywords:
    - setup
    - production
    - server
    - ubuntu
---

A full guide for installing, configuring and running Ghost on your Ubuntu **16.04** or **18.04** server, for use in production

## Overview

This the official guide for self-hosting Ghost using our recommended stack of Ubuntu 16.04 or 18.04. If you're comfortable installing, maintaining and updating your own software, this is the place for you. By the end of this guide you'll have a fully configured Ghost install running in production using MySQL.

This install is **not** suitable for [local use](/install/local/) or [contributing](/install/source/) to core.

<a class="sbox" href="https://www.digitalocean.com/docs/one-clicks/ghost/" target="_blank" rel="noopener">
    <div class="sbox-image">
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="65.2 173.5 180 180"><style>.st0{fill:#0080ff}</style><g id="XMLID_229_"><g id="XMLID_690_"><g id="XMLID_691_"><g id="XMLID_44_"><g id="XMLID_48_"><path id="XMLID_49_" class="st0" d="M155.2 351.7v-34.2c36.2 0 64.3-35.9 50.4-74-5.1-14.1-16.4-25.4-30.5-30.5-38.1-13.8-74 14.2-74 50.4H67c0-57.7 55.8-102.7 116.3-83.8 26.4 8.3 47.5 29.3 55.7 55.7 18.9 60.6-26 116.4-83.8 116.4z"/></g><path id="XMLID_47_" class="st0" d="M155.3 317.6h-34v-34h34z"/><path id="XMLID_46_" class="st0" d="M121.3 343.8H95.1v-26.2h26.2z"/><path id="XMLID_45_" class="st0" d="M95.1 317.6H73.2v-21.9h21.9v21.9z"/></g></g></g></g></svg>
    </div>
    <div class="sbox-content">
        <h4>Save time with our DigitalOcean One-Click Application</h4>
        <p>This is a detailed manual install guide, but we've also teamed up with our friends over at DigitalOcean to  automate nearly the entire process and have you up and running in just a few minutes 👉</p>
    </div>
</a>

---

## Server Setup

This part of the guide will ensure all prerequisites are met for installing the Ghost-CLI.

### Create a new user 👋

Open up your terminal and login to your new server as the root user:

```bash
# Login via SSH
ssh root@your_server_ip

# Create a new user and follow prompts
adduser <user>
```

> Note: Using the user name `ghost` causes conflicts with the Ghost-CLI, so it’s important to use an alternative name.

```bash
# Add user to superuser group to unlock admin privileges
usermod -aG sudo <user>

# Then log in as the new user
su - <user>
```

### Update packages

Ensure package lists and installed packages are up to date.

```bash
# Update package lists
sudo apt-get update

# Update installed packages
sudo apt-get upgrade
```

Follow any prompts to enter the password you just created in the previous step.

### Install NGINX

Ghost uses an NGINX server and the SSL configuration requires NGINX 1.9.5 or higher.

```bash
# Install NGINX
sudo apt-get install nginx
```

If `ufw` was activated, the firewall allows HTTP and HTTPS connections. Open Firewall:

```bash
sudo ufw allow 'Nginx Full'
```

### Install MySQL

Next, you'll need to install MySQL to be used as the production database.

```bash
# Install MySQL
sudo apt-get install mysql-server
```

#### MySQL on Ubuntu 18.04

If you’re running Ubuntu 18.04, a password is required to ensure MySQL is compatible with `Ghost-CLI`. This requires a few extra steps!

```bash
# To set a password, run
sudo mysql

# Now update your user with this password
# Replace 'password' with your password, but keep the quote marks!
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

# Then exit MySQL
quit

# and login to your Ubuntu user again
su - <user>
```

### Install Node.js

You will need to have a [supported version](/faq/node-versions/) of Node installed system-wide in the manner described below. If you have a different setup, you may encounter problems.

```bash
# Add the NodeSource APT repository for Node 8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash

# Install Node.js
sudo apt-get install -y nodejs
```

---

### Install MongoDB

```bash
# 切换到下载目录
cd Downloads

# 下载
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz

# 解压
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz

# 将解压包拷贝到指定目录
mv  mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb

# MongoDB 的可执行文件位于 bin 目录下，所以可以将其添加到 PATH 路径中
export PATH=/usr/local/mongodb/bin:$PATH

# 创建数据库目录
# /data/db 是 MongoDB 默认的数据库路径
# 这个目录在安装过程不会自动创建
mkdir -p /data/db

# 启动 MongoDB 服务
# 如果你的数据库目录不是/data/db，可以通过 --dbpath 来指定。
sudo /usr/local/mongodb/bin/mongod

# MongoDB 后台管理 Shell
# 保证 MongoDB 服务已经启动着
sudo /usr/local/mongodb/bin/mongo
```

---
