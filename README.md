# EDB Vagrant Development Box

A Centos7 based development box for PPAS.  Provisioned with Ansible.

## What it does?

It spins up an Centos7 VM on your development machine and provisions it with all of the required depedencies for development. 

## Installation

1. Download [vagrant](https://sourabhbajaj.com/mac-setup/Vagrant/README.html) and following instructions to install.  Make sure you also install `Virtual Box`.

1. Clone this repository.

1. `vagrant up` to spin up the box.

1. `vagrant ssh` to log onto the box.

## Setup

1. From the vagrant home directory run ```sh ./provision/initialize.sh``` to initialize the database.

1. Run ```sh ./provision/start-server.sh``` to start the database server.

## Connecting from host

In order to connect to the vagrant db instance, we have to manually make the following changes.

### In the vagrant home directory type ```vi pgdata/pg_hba.conf``` and add the following line to the end of the file.

```bash
host all all 0.0.0.0/0 trust
```

### In the vagrant home directory type ```vi pgdata/postgresql.conf``` and add the following line to the end of the file.

```bash
listen_addresses = '*'
```

You should be able to connect to the Postgresql Server now.


## Post Setup

1. Create a database `create database demo;`.

1. Create a user `CREATE user demo with encrypted password 'demo'`.

1. Grant privileges `grant all privileges on database demo to demo`.