./configure --prefix=/home/vagrant/db --with-pgport=5432 --with-libxml --enable-cassert --enable-debug --enable-depend --enable-dtrace CFLAGS="-g -O0"
make
make install