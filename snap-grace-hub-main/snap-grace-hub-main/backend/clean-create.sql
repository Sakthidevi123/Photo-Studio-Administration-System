-- Clean database creation script for Snap Grace Hub

USE snapgracehub;

-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS staff_skills;
DROP TABLE IF EXISTS photo_delivery_items;
DROP TABLE IF EXISTS photo_deliveries;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS service_items;
DROP TABLE IF EXISTS staff;

-- Create tables
CREATE TABLE staff (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE staff_skills (
    staff_id BIGINT NOT NULL,
    skill VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE service_items (
    id BIGINT NOT NULL AUTO_INCREMENT,
    active BIT,
    duration_min INTEGER,
    price DECIMAL(38,2) NOT NULL,
    category VARCHAR(255),
    description VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE bookings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    assigned_staff_id BIGINT,
    scheduled_at DATETIME(6) NOT NULL,
    service_item_id BIGINT,
    customer_email VARCHAR(255),
    customer_name VARCHAR(255) NOT NULL,
    status VARCHAR(255),
    time_slot VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE photo_deliveries (
    id BIGINT NOT NULL AUTO_INCREMENT,
    booking_id BIGINT NOT NULL,
    notes VARCHAR(255),
    title VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE photo_delivery_items (
    delivery_id BIGINT NOT NULL,
    photo_url VARCHAR(255)
) ENGINE=InnoDB;

-- Add foreign key constraints
ALTER TABLE bookings 
   ADD CONSTRAINT FKnv5vra97r80x2iur3q6nrtlrg 
   FOREIGN KEY (assigned_staff_id) 
   REFERENCES staff (id);

ALTER TABLE bookings 
   ADD CONSTRAINT FKja1x7n58l43gvh30c8gld4x7f 
   FOREIGN KEY (service_item_id) 
   REFERENCES service_items (id);

ALTER TABLE photo_deliveries 
   ADD CONSTRAINT FKqurb21o0h03xh54242ogppfm0 
   FOREIGN KEY (booking_id) 
   REFERENCES bookings (id);

ALTER TABLE photo_delivery_items 
   ADD CONSTRAINT FK24fwuhmqvtol4lhc0vududmdv 
   FOREIGN KEY (delivery_id) 
   REFERENCES photo_deliveries (id);

ALTER TABLE staff_skills 
   ADD CONSTRAINT FKoggffssaaj2mbjpt3hsu1s23d 
   FOREIGN KEY (staff_id) 
   REFERENCES staff (id);
