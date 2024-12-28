CREATE DATABASE ecommercern;

CREATE TABLE users (
  id VARCHAR(100) NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  email VARCHAR(50) NOT NULL
);

CREATE TABLE product (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(75) NOT NULL,
  description text,
  image TEXT NOT NULL,
  price NUMERIC NOT NULL
);

CREATE TABLE cart (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cart_item (
  cart_id INTEGER NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES product(id),
  quantity INTEGER NOT NULL,
  PRIMARY KEY (cart_id, product_id)
);

CREATE TABLE orders (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cart_id INTEGER NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
  total NUMERIC(8, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE order_item (
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES product(id),
  quantity INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);

INSERT INTO product (title, description, image, price)
VALUES
('AirPods Pro', 'Apple`s wireless noise-cancelling earbuds with adaptive transparency and spatial audio.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/airpodspro.jpg', 249.99),
('Apple Watch Series 9', 'Latest smartwatch from Apple featuring always-on retina display and advanced health monitoring.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/applewatch.jpg', 399.99),
('Bose Noise Cancelling Headphones', 'Premium noise-cancelling over-ear headphones with 20 hours of battery life and voice assistant integration.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/boseheadphones.jpg', 349.99),
('Dyson V15 Vacuum', 'Powerful cordless vacuum with laser-detect technology and advanced filtration system.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/dysonvacuum.jpg', 699.99),
('Samsung Galaxy S24 Ultra', 'Flagship smartphone with 200MP camera, 120Hz AMOLED display, and S Pen support.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/galaxys24ultra.jpg', 1199.99),
('iPad Pro', '12.9-inch iPad Pro with M2 chip, Liquid Retina XDR display, and 5G connectivity.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/ipad.jpg', 1099.99),
('iPhone 16 Pro', 'Apple`s latest iPhone with A18 Bionic chip, ProMotion display, and advanced triple-lens camera system.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/iphone16pro.jpg', 1299.99),
('PlayStation 5', 'Sony`s latest gaming console with 8K output, lightning-fast load times, and 825GB SSD.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/playstation5.jpg', 499.99);
