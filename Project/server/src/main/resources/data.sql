INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'john.doe@example.com', 'John', 'Doe', 'customer');
INSERT INTO customers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'jane.doe@example.com', 'Jane', 'Doe', 'customer');
INSERT INTO customers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'jim.smith@example.com', 'Jim', 'Smith', 'customer');
INSERT INTO customers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'emma.jones@example.com', 'Emma', 'Jones', 'customer');
INSERT INTO customers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'lucas.miller@example.com', 'Lucas', 'Miller', 'customer');
INSERT INTO customers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'alice.johnson@example.com', 'Alice', 'Johnson', 'expert');
INSERT INTO experts (id, expertise) VALUES (currval('user_sequence'), 'INFORMATION');

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'bob.williams@example.com', 'Bob', 'Williams', 'expert');
INSERT INTO experts (id, expertise) VALUES (currval('user_sequence'), 'HARDWARE');

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'charlie.brown@example.com', 'Charlie', 'Brown', 'expert');
INSERT INTO experts (id, expertise) VALUES (currval('user_sequence'), 'MAINTENANCE');

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'diana.davis@example.com', 'Diana', 'Davis', 'expert');
INSERT INTO experts (id, expertise) VALUES (currval('user_sequence'), 'NETWORK');

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'edward.martinez@example.com', 'Edward', 'Martinez', 'expert');
INSERT INTO experts (id, expertise) VALUES (currval('user_sequence'), 'SOFTWARE');

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'olivia.jackson@example.com', 'Olivia', 'Jackson', 'manager');
INSERT INTO managers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'liam.taylor@example.com', 'Liam', 'Taylor', 'manager');
INSERT INTO managers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'ava.lee@example.com', 'Ava', 'Lee', 'manager');
INSERT INTO managers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'james.harris@example.com', 'James', 'Harris', 'manager');
INSERT INTO managers (id) VALUES (currval('user_sequence'));

INSERT INTO users (id, email, name, surname, role) VALUES (nextval('user_sequence'), 'sophia.clark@example.com', 'Sophia', 'Clark', 'manager');
INSERT INTO managers (id) VALUES (currval('user_sequence'));

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