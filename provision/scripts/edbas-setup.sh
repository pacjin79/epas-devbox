./configure --with-openssl --with-zlib --with-tcl --with-perl --with-libxslt --with-ossp-uuid --with-ldap --with-pam --with-libcurl --with-pgport=5444 --enable-nls --enable-cassert --enable-debug --enable-depend --prefix=/home/vagrant/edbas/db CFLAGS="-g -O0"
make
make install

/home/vagrant/edbas/db/bin/initdb -D /home/vagrant/edbas/pgdata
/home/vagrant/edbas/db/bin/pg_ctl -D /home/vagrant/edbas/pgdata -l edbas.log start