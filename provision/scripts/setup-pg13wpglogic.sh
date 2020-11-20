#!/usr/bin/bash

sudo yum -y install https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
sudo yum -y update 
sudo su - postgres

# https://computingforgeeks.com/how-to-install-postgresql-13-on-centos-7/