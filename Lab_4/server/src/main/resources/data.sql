INSERT INTO users (id, email, name, surname, role) VALUES (1, 'john.doe@example.com', 'John', 'Doe', 'customer');
INSERT INTO users (id, email, name, surname, role) VALUES (2, 'jane.doe@example.com', 'Jane', 'Doe', 'customer');
INSERT INTO users (id, email, name, surname, role) VALUES (3, 'jim.smith@example.com', 'Jim', 'Smith', 'customer');
INSERT INTO users (id, email, name, surname, role) VALUES (4, 'emma.jones@example.com', 'Emma', 'Jones', 'customer');
INSERT INTO users (id, email, name, surname, role) VALUES (5, 'lucas.miller@example.com', 'Lucas', 'Miller', 'customer');
INSERT INTO users (id, email, name, surname, role) VALUES (6, 'alice.johnson@example.com', 'Alice', 'Johnson', 'expert');
INSERT INTO users (id, email, name, surname, role) VALUES (7, 'bob.williams@example.com', 'Bob', 'Williams', 'expert');
INSERT INTO users (id, email, name, surname, role) VALUES (8, 'charlie.brown@example.com', 'Charlie', 'Brown', 'expert');
INSERT INTO users (id, email, name, surname, role) VALUES (9, 'diana.davis@example.com', 'Diana', 'Davis', 'expert');
INSERT INTO users (id, email, name, surname, role) VALUES (10, 'edward.martinez@example.com', 'Edward', 'Martinez', 'expert');
INSERT INTO users (id, email, name, surname, role) VALUES (11, 'olivia.jackson@example.com', 'Olivia', 'Jackson', 'manager');
INSERT INTO users (id, email, name, surname, role) VALUES (12, 'liam.taylor@example.com', 'Liam', 'Taylor', 'manager');
INSERT INTO users (id, email, name, surname, role) VALUES (13, 'ava.lee@example.com', 'Ava', 'Lee', 'manager');
INSERT INTO users (id, email, name, surname, role) VALUES (14, 'james.harris@example.com', 'James', 'Harris', 'manager');
INSERT INTO users (id, email, name, surname, role) VALUES (15, 'sophia.clark@example.com', 'Sophia', 'Clark', 'manager');

INSERT INTO customers (id) VALUES (1);
INSERT INTO customers (id) VALUES (2);
INSERT INTO customers (id) VALUES (3);
INSERT INTO customers (id) VALUES (4);
INSERT INTO customers (id) VALUES (5);

INSERT INTO experts (id, expertise) VALUES (6, 'INFORMATION');
INSERT INTO experts (id, expertise) VALUES (7, 'HARDWARE');
INSERT INTO experts (id, expertise) VALUES (8, 'MAINTENANCE');
INSERT INTO experts (id, expertise) VALUES (9, 'NETWORK');
INSERT INTO experts (id, expertise) VALUES (10, 'SOFTWARE');

INSERT INTO managers (id) VALUES (11);
INSERT INTO managers (id) VALUES (12);
INSERT INTO managers (id) VALUES (13);
INSERT INTO managers (id) VALUES (14);
INSERT INTO managers (id) VALUES (15);

INSERT INTO products (ean, name, brand) VALUES ('4935531465706', 'JMT X-ring 530x2 Gold 104 Open Chain With Rivet Link for Kawasaki KH 400 a 1976', 'JMT');
INSERT INTO products (ean, name, brand) VALUES ('3528701753911', '1x Summer Tyre Michelin Pilot Sport 4 255/40zr17 98y El', 'Michelin');
INSERT INTO products (ean, name, brand) VALUES ('5013879835005', 'Kent Bag of Rags 500g 100 Cotton KR500', 'Kent');
INSERT INTO products (ean, name, brand) VALUES ('5051747498761', 'Sealey Tools VS3815 Suspension Arm Lever', 'Sealey');
INSERT INTO products (ean, name, brand) VALUES ('4007817331927', 'Staedtler Lumocolor Medium Tip Water Soluble OHP Black Pen St33192', 'Staedtler');

INSERT INTO warranties (id, product_ean, customer_id, date_of_purchase, end_of_warranty) VALUES (nextval('warranties_id_seq'), '4935531465706', '1', '2023-05-01', '2025-05-01');
INSERT INTO warranties (id, product_ean, customer_id, date_of_purchase, end_of_warranty) VALUES (nextval('warranties_id_seq'), '3528701753911', '2', '2023-05-01', '2025-05-01');
INSERT INTO warranties (id, product_ean, customer_id, date_of_purchase, end_of_warranty) VALUES (nextval('warranties_id_seq'), '5013879835005', '3', '2023-05-02', '2025-05-02');
INSERT INTO warranties (id, product_ean, customer_id, date_of_purchase, end_of_warranty) VALUES (nextval('warranties_id_seq'), '5051747498761', '1', '2023-05-02', '2025-05-02');
INSERT INTO warranties (id, product_ean, customer_id, date_of_purchase, end_of_warranty) VALUES (nextval('warranties_id_seq'), '4007817331927', '4', '2023-05-02', '2025-05-02');