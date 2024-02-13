CREATE DATABASE IF NOT EXISTS meals;
DEFAULT CHARACTER SET = 'utf8mb4';

SET NAMES utf8mb4;

USE meals;

CREATE TABLE
    `Reservation` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `number_of_guests` int(10) NOT NULL,
        `meal_id` int(10) NOT NULL,
        `created_date` DATE,
        `contact_phonenumber` VARCHAR(255),
        `contact_name` VARCHAR(255),
        `contact_email` VARCHAR(255)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    `Meal` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT,
        `location` VARCHAR(255),
        `when` DATETIME,
        `max_reservations` INT(10),
        `price` DECIMAL(5,2),
        `created_date` DATE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
      `Review` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT,
        `meal_id` INT(10),
        `stars` INT(10),
        `created_date` DATE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


-- Meal Insertion
INSERT INTO Meal (title, description, location, `when`, max_reservations, price, created_date)
VALUES ('Milanesa Napolitana', 'Breaded beef or chicken topped with tomato sauce, ham, cheese.', 'Buenos Aires', '2023-11-21 18:00:00', 10, 25.99, '2023-11-21'),
       ('Empanadas', 'savory stuffed pastries, typically filled with various ingredients such as meat, cheese, or vegetables, and baked or fried', 'Buenos Aires', '2023-09-21 15:00:00', 5, 5.99, '2022-06-11'),
       ('Stegt flæsk med persillesovs', 'Fried pork belly with parsley sauce, served with boiled potatoes.', 'Roskilde', '2023-05-25 12:00:00', 8, 15.99, '2023-01-15');


-- Reservations Insertion
INSERT INTO Reservation (number_of_guests, created_date, contact_phonenumber, contact_name, contact_email, meal_id)
VALUES (1, '2024-06-01 20:00:00', '+54 1812 2022', 'Lionel', 'LioM10@gmail.com', 1),
       (7, '2024-01-29 20:30:00', '+966 7007 0770', 'Cristiano', 'CR7@gmail.com', 2),
       (9, '2024-06-01 20:00:00', '+47 2023 0009', 'Erling', 'Viking@gmail.com', 3),
       (2, '2024-06-01 20:00:00', '+54 1812 2022', 'Lionel', 'LioM10@gmail.com', 3);

-- Reviews Insertion
INSERT INTO `Review` (id, title, description, meal_id, stars, created_date)
VALUES (1, 'Milanesas', 'A delightful blend of perfectly seasoned meat and a golden, crispy coating, delivering a tantalizing taste experience', 1, 4, '2023-01-29 11:00:00'),
       (2, 'Empanadas', 'These empanadas boasted a delightful fusion of flavors within their golden, crispy pastry, a true culinary delight.', 2, 4, '2023-05-10 14:00:00'),
       (3, 'Stegt flæsk med persillesovs', 'Crispy, perfectly paired with creamy parsley sauce, a quintessential Danish comfort dish', 3, 3, '2023-06-06 18:00:00');
