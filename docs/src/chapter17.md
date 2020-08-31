# 16 - PosgreSQL

UNDER DEVELOPMENT!

### Contents

```@contents
Pages = ["chapter17.md"]
```

urls
- https://www.postgresql.org/download/linux/ubuntu/
- https://linuxize.com/post/how-to-install-postgresql-on-ubuntu-18-04/
- https://www.a2hosting.com/kb/developer-corner/postgresql/managing-postgresql-databases-and-users-from-the-command-line

sudo apt install libpq5

====

Naar https://www.postgresql.org/download

kies Ubuntu

kies Bionic(18.04)

in bestand /etc/apt/sources.list.d/pgdg.list, zet:

deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

sudo apt-get update

====

$ sudo apt install postgresql postgresql-contrib

$ sudo -u postgres psql -c "SELECT version();"

====

$ sudo su - postgres

postgres@rob-Lenovo-Y520-15IKBN:~$ createuser --interactive --pwprompt

postgres@rob-Lenovo-Y520-15IKBN:~$ createdb johndb

postgres@rob-Lenovo-Y520-15IKBN:~$ psql

postgres=# grant all privileges on database johndb to john;

====

$ sudo service postgresql restart

====

$ julia

julia> using DataFrames

julia> using LibPQ

julia> conn = LibPQ.Connection("host=localhost dbname=johndb user=john password=xxxxxxx")
