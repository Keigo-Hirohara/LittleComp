CREATE USER docker_user;

CREATE DATABASE littlecomp;

GRANT ALL PRIVILEGES ON DATABASE littlecomp TO docker_user;

\c littlecomp

CREATE TABLE stories (
  id integer NOT NULL,
  name varchar(45) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO stories VALUES (1, 'init postgresql server use docker');