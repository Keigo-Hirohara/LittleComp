CREATE USER docker_user;

CREATE DATABASE littlecomp;

GRANT ALL PRIVILEGES ON DATABASE littlecomp TO docker_user;

\c littlecomp