# EDB Vagrant Development Box

A Centos7 based box for EDBAS.  Provisioned with Ansible.

## What it does?

It spins up an Centos7 VM on your development machine and provisions it with all of the required depedencies to run EDBAS.
After the initial provisioning with `vagrant up`.  You will have a Centos7 environment with:

1. EDBAS built and installed.
2. Postgresql Community built and installed.
3. Both database instance initialized and started. 

## Installation

1. Download [vagrant](https://sourabhbajaj.com/mac-setup/Vagrant/README.html) and following instructions to install.  Use VirtualBox as the VM provider.

1. Clone this repository.

1. `vagrant up` to spin up the box. (Please be patient, this step provisions the system and will take awhile around 5 min on macbook pro)

1. `vagrant ssh` to log onto the box.

## Usage

Launch EDBAS by typing `/home/vagrant/codebase/edbas_work/db/bin/psql edb` to connect to advance server.

Create a demo database and user

1. Create a database `create database demo;`.

1. Create a user `CREATE user demo with encrypted password 'demo'`.

1. Grant privileges `grant all privileges on database demo to demo`.


Now you can connect to EDBAS externally, I use pgAdmin to connect and view my data base.