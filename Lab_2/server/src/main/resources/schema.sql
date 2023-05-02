create table if not exists products(
    ean varchar(15) primary key,
    name varchar(255),
    brand varchar(255)
);

create table if not exists customers(
    id int primary key GENERATED ALWAYS AS IDENTITY,
    email varchar(255) UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    surname varchar(255) NOT NULL
);

create table if not exists tickets(
    id int primary key GENERATED ALWAYS AS IDENTITY,
    product_ean varchar(15) NOT NULL,
    customer_id int NOT NULL,
    assigned_to int,
    subject varchar(255) NOT NULL,
    issue varchar(255) NOT NULL,

    FOREIGN KEY (product_ean) REFERENCES products(ean),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);


create table if not exists warranties(
    id int primary key GENERATED ALWAYS AS IDENTITY,
    product_ean varchar(15) NOT NULL,
    customer_id int NOT NULL,
    date_of_purchase date NOT NULL,
    end_of_warranty date NOT NULL,
    FOREIGN KEY (product_ean) REFERENCES products(ean),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);


create table if not exists customers(
    ticketId int primary key,
    status varchar(255) NOT NULL,
    updatedAt date NOT NULL
);