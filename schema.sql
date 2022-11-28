CREATE TABLE main_categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
);

CREATE TABLE sub_categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(50),
    main_category_id int,
    description TEXT,
    image_url varchar(200) NULL
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(50),
    price decimal(12, 2),
    description TEXT,
    sub_category_id int,
    discount_id int,
    created_at datetime DEFAULT now(),    
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id) ON DELETE CASCADE
);

CREATE TABLE images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    iamge_url varchar(200),
    product_id int,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

CREATE TABLE genders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    gender varchar(10)
);

CREATE TABLE stores (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
);

CREATE TABLE colors (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
);

CREATE TABLE sizes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    size varchar(50)
);

CREATE TABLE product_informations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id int,
    store_id int,
    color_id int,
    size_id int,
    remaining_stock int,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores (id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colors (id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes (id) ON DELETE CASCADE
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name varchar(40),
    email varchar(50) UNIQUE,
    password varchar(100),
    membership boolean DEFAULT 0,
    address varchar(255),
    phone_number varchar(20),
    gender_id int,
    created_at datetime DEFAULT now(),
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE now(),
    FOREIGN KEY (gender_id) REFERENCES genders (id) ON DELETE CASCADE
);

CREATE TABLE order_status (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status varchar(30)
);

CREATE TABLE order_products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    quantity int,
    order_status_id int,
    user_id int,
    product_information_id int,
    created_at datetime DEFAULT now(),
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE now(),
    FOREIGN KEY (order_status_id) REFERENCES order_status (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (product_information_id) REFERENCES product_informations (id) ON DELETE CASCADE
);

CREATE TABLE carts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    quantity int,
    user_id int,
    product_information_id int,
    created_at datetime DEFAULT now(),
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE now(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (product_information_id) REFERENCES product_informations (id) ON DELETE CASCADE 
);

CREATE TABLE reviews(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comment TEXT,
    user_id int,
    product_id int,
    created_at datetime DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);