DROP DATABASE IF EXISTS airbrbRes;

CREATE DATABASE airbrbRes;

USE airbrbRes;

CREATE TABLE reservation (
  id int NOT NULL AUTO_INCREMENT,
  listingId int NOT NULL,
  standardPrice integer NOT NULL,
  cleaningFee integer NOT NULL,
  weeklyDiscount decimal(3, 2) NOT NULL,
  refundable boolean NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE dates (
	id int NOT NULL AUTO_INCREMENT,
	availableDate varchar(30) NOT NULL,
	fee int NOT NULL,
  reservation_id int NOT NULL,
  PRIMARY KEY (id),
	FOREIGN KEY (reservation_id)
        REFERENCES reservation (id)
        ON DELETE CASCADE
);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'null';

FLUSH PRIVILEGES;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/