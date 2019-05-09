---
title: 'CentOS'
date: '2019-05-09'
keywords:
    - setup
    - server
    - centos
---

## Setting
### Close Firewall
```bash
#停止firewall
systemctl stop firewalld.service 

#禁止firewall开机启动
systemctl disable firewalld.service 
```