create table if not exists products(
    ean varchar(15) primary key,
    name varchar(255),
    brand varchar(255)
);

create table if not exists profiles(
    email varchar(255) primary key,
    name varchar(255),
    surname varchar(255)
)