-- Import dependency for using uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user table
CREATE TABLE "user" (
	uuid UUID DEFAULT uuid_generate_v4 (),
	first_name VARCHAR (80) NOT NULL,
	last_name VARCHAR (80) NOT NULL,
	username VARCHAR (80) UNIQUE NOT NULL,
    email VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT user_pk PRIMARY KEY (uuid)
);

-- Populate the user table with some default data, so we have some users
INSERT INTO "user"
    ("uuid", "first_name", "last_name", "username", "email", "password")
    VALUES
	('dc39c393-a720-41df-b7f9-34f89c6c6524', 'A', 'Har', 'test', 'a@a.a', 'password'),
	('3b30ce35-c459-403a-8b57-b3a304f50404', 'B', 'Har', 'test1', 'b@b.b', 'password'),
	('a50b24a8-a94c-478b-9fb6-85714f2d664f', 'C', 'Har', 'test2', 'c@c.c', 'password');

-- Empty the user table
DELETE FROM user;
-- Drop the user table
DROP TABLE user;

-- Create patients table
-- This is the sensative patient information
CREATE TABLE "patients" (
	uuid UUID DEFAULT uuid_generate_v4 (),
	anonymous_id varchar(8) UNIQUE NOT NULL,
	birth_weight int2 NOT NULL,
	ga_weeks int2 NOT NULL,
	ga_days int2 NOT NULL,
	ett_size_calc NUMERIC(7, 4) NOT NULL,
	ett_size_actual NUMERIC(7, 4),
    ett_depth_weight_calc NUMERIC(7, 4) NOT NULL,
    ett_depth_age_calc NUMERIC(7, 4) NOT NULL,	
	ett_depth_actual NUMERIC(7, 4),
	uac_depth_calc NUMERIC(7, 4) NOT NULL,
	uac_depth_actual NUMERIC(7, 4),
	uvc_depth_calc NUMERIC(7, 4) NOT NULL,
	uvc_depth_actual NUMERIC(7, 4),
	ns_bolus_given bool NOT NULL DEFAULT FALSE,
	bp_systolic int2,
	bp_diastolic int2,
	map int2,
	ns_bolus_qty int2,
	d10_bolus_given bool NOT NULL DEFAULT FALSE,
	init_blood_glucos int2,
	d10_bolus_qty int2,
	notes text,
	managed_by UUID NOT NULL REFERENCES "user"(uuid) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES "user"(uuid),
    updated_by UUID NOT NULL REFERENCES "user"(uuid),
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),	
	CONSTRAINT subjects_pk PRIMARY KEY (uuid)
);

INSERT INTO "patients"
("anonymous_id", "birth_weight", "ga_weeks", "ga_days", "ett_size_calc", "ett_depth_weight_calc", "ett_depth_age_calc", "uac_depth_calc", "uvc_depth_calc", "managed_by", "created_by", "updated_by")
VALUES
('A0001', '1700', '23', '6', '3', '7.5', '7.5', '14.1', '8.05', 'dc39c393-a720-41df-b7f9-34f89c6c6524', 'dc39c393-a720-41df-b7f9-34f89c6c6524', 'dc39c393-a720-41df-b7f9-34f89c6c6524'),
('A0002', '1500', '21', '5', '3', '7.5', '7.5', '13.5', '7.75', 'dc39c393-a720-41df-b7f9-34f89c6c6524', 'dc39c393-a720-41df-b7f9-34f89c6c6524', 'dc39c393-a720-41df-b7f9-34f89c6c6524'),
('B0001', '1500', '21', '5', '3', '7.5', '7.5', '13.5', '7.75', '3b30ce35-c459-403a-8b57-b3a304f50404', '3b30ce35-c459-403a-8b57-b3a304f50404', '3b30ce35-c459-403a-8b57-b3a304f50404');

DELETE FROM patients;

DROP TABLE patients;


-- -- Import dependency for using uuid
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -- Create admin table, without self reference for created_by, updated_by, or reference to admin_role table for for admin_role
-- CREATE TABLE "admin" (
-- 	uuid UUID DEFAULT uuid_generate_v4 (),
--     admin_role UUID NOT NULL,
-- 	first_name VARCHAR (80) NOT NULL,
-- 	last_name VARCHAR (80) NOT NULL,
--     email VARCHAR (80) UNIQUE NOT NULL,
--     phone VARCHAR (50),
--     password VARCHAR (1000) NOT NULL,
--     created_by UUID NOT NULL,
--     updated_by UUID NOT NULL,
--     created_at timestamptz NOT NULL DEFAULT NOW(),
--     updated_at timestamptz NOT NULL DEFAULT NOW(),	
-- 	CONSTRAINT admin_pk PRIMARY KEY (uuid)
-- );

-- -- Populate the admin table with some default data, so we have some admins
-- INSERT INTO "admin"
--     ("uuid", "admin_role", "first_name", "last_name", "email", "password", "created_by", "updated_by")
--     VALUES
-- 	('b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6', '6f31c195-f37b-4161-9ed8-ebe99a818bdd', 'Default', 'Admin', 'aharasymiw+0@gmail.com', 'password', 'b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6', 'b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6'),
-- 	('fa44667c-c515-4262-a1a2-557733d2b1b4', '6f31c195-f37b-4161-9ed8-ebe99a818bdd', 'Deleted', 'Admin', 'aharasymiw+1@gmail.com', 'password', 'b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6', 'b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6'),
-- 	('ffcdc91f-6913-4aba-972a-fea2bf9053f0', '6f31c195-f37b-4161-9ed8-ebe99a818bdd', 'Andrew', 'Harasymiw', 'aharasymiw+2@gmail.com', 'password', 'b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6', 'b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6');

-- -- Empty the admin table
-- -- DELETE FROM admin;
-- -- Drop the admin table
-- -- DROP TABLE admin;

-- -- Create institution table
-- CREATE TABLE "institution" (
-- 	uuid UUID DEFAULT uuid_generate_v4 (),
-- 	name VARCHAR (100) NOT NULL,
-- 	email_domain VARCHAR (80) UNIQUE NOT NULL,
--     phone VARCHAR (50),
--     phone_extension VARCHAR (50),
--     institution_contact UUID NOT NULL,
--     created_by UUID NOT NULL REFERENCES admin(uuid),
--     updated_by UUID NOT NULL REFERENCES admin(uuid),
--     created_at timestamptz NOT NULL DEFAULT NOW(),
--     updated_at timestamptz NOT NULL DEFAULT NOW(),
-- 	CONSTRAINT institution_pk PRIMARY KEY (uuid)
-- );

-- -- Populate the institution table with some default data, so we have an institution
-- -- For now, we are only dealing with UCSF at launch
-- INSERT INTO "institution"
--     ("name", "email_domain", "institution_contact", "created_by", "updated_by")
--     VALUES
-- 	('UCSF', '@ucsf.edu', '31ec8aa9-1fdf-4952-8c94-13164292a880', '754a3c53-fd73-49ea-be6b-7176d82f3932', '692b0eaf-4ea6-4547-aad4-124af1303fdb');

-- -- Empty the institution table
-- DELETE FROM institution;
-- -- Drop the institution table
-- DROP TABLE institution;

-- -- Create user table
-- CREATE TABLE "user" (
-- 	uuid UUID DEFAULT uuid_generate_v4 (),
-- 	first_name VARCHAR (80) NOT NULL,
-- 	last_name VARCHAR (80) NOT NULL,
--     email VARCHAR (80) UNIQUE NOT NULL,
--     phone VARCHAR (50),
--     password VARCHAR (1000) NOT NULL,
--     institution_uuid UUID REFERENCES institution(uuid),
--     created_by UUID NOT NULL REFERENCES admin(uuid),
--     updated_by UUID NOT NULL REFERENCES admin(uuid),
--     created_at timestamptz NOT NULL DEFAULT NOW(),
--     updated_at timestamptz NOT NULL DEFAULT NOW(),
-- 	CONSTRAINT user_pk PRIMARY KEY (uuid)
-- );

-- -- Populate the user table with some default data, so we have some users
-- INSERT INTO "user"
--     ("first_name", "last_name", "email", "password", "created_by", "updated_by")
--     VALUES
-- 	('Andrew', 'Harasymiw', 'aharasymiw+3@gmail.com', 'password', '2154022e-e666-4c23-9668-02f406c7735e', '55315ced-b07f-4391-944f-6c5e17c242f6'),
-- 	('Andrew', 'Harasymiw', 'aharasymiw+4@gmail.com', 'password', '2154022e-e666-4c23-9668-02f406c7735e', '55315ced-b07f-4391-944f-6c5e17c242f6');

-- -- Empty the user table
-- DELETE FROM user;
-- -- Drop the user table
-- DROP TABLE user;

-- -- Create patients table
-- -- This is the sensative patient information
-- CREATE TABLE "patients" (
-- 	uuid UUID DEFAULT uuid_generate_v4 (),
-- 	anonymous_id varchar(8) UNIQUE NOT NULL,
-- 	birth_weight int2 NOT NULL,
-- 	ga_weeks int2 NOT NULL,
-- 	ga_days int2 NOT NULL,
-- 	ett_size_calc NUMERIC(7, 4) NOT NULL,
-- 	ett_size_actual NUMERIC(7, 4),
-- 	ett_depth_weight_calc NUMERIC(7, 4) NOT NULL,
-- 	ett_depth_age_calc NUMERIC(7, 4) NOT NULL,
-- 	ett_depth_actual NUMERIC(7, 4),
-- 	uac_depth_calc NUMERIC(7, 4) NOT NULL,
-- 	uac_depth_actual NUMERIC(7, 4),
-- 	uvc_depth_calc NUMERIC(7, 4) NOT NULL,
-- 	uvc_depth_actual NUMERIC(7, 4),
-- 	ns_bolus_given bool NOT NULL DEFAULT FALSE,
-- 	bp_systolic int2,
-- 	bp_diastolic int2,
-- 	map int2,
-- 	ns_bolus_qty int2,
-- 	d10_bolus_given bool NOT NULL DEFAULT FALSE,
-- 	init_blood_glucos int2,
-- 	d10_bolus_qty int2,
-- 	notes text,
-- 	managed_by UUID NOT NULL REFERENCES "user"(uuid) ON DELETE CASCADE,
--     created_by UUID NOT NULL REFERENCES "user"(uuid),
--     updated_by UUID NOT NULL REFERENCES "user"(uuid),
--     created_at timestamptz NOT NULL DEFAULT NOW(),
--     updated_at timestamptz NOT NULL DEFAULT NOW(),	
-- 	CONSTRAINT subjects_pk PRIMARY KEY (uuid)
-- );

-- INSERT INTO "patients"
--     ("anonymous_id", "birth_weight", "ga_weeks", "ga_days", "ett_size_calc", "ett_depth_weight_calc", "ett_depth_age_calc", "uvc_depth_calc", "uac_depth_calc", "managed_by", "created_by", "updated_by")
--     VALUES
-- 	('A0001', '1700', '23', '6', '3', '7.5', '7.5', '14.1', '8.05', '8384dcf0-6184-453b-87e9-f0231dc95652', '5f606931-2df7-4d7c-8d88-4dfefff2a990', 'd06fabdc-04cd-46ce-a21f-b9e5e359f082');
-- 	('B0002', '1500', '21', '5', '3', '7.5', '7.5', '13.5', '7.75', '8384dcf0-6184-453b-87e9-f0231dc95652', '5f606931-2df7-4d7c-8d88-4dfefff2a990', 'd06fabdc-04cd-46ce-a21f-b9e5e359f082');
-- DELETE FROM patients;

-- DROP TABLE patients;

-- CREATE TABLE "admin_role" (
-- 	uuid UUID DEFAULT uuid_generate_v4 (),
-- 	role varchar(80) UNIQUE NOT NULL,
--     created_by UUID NOT NULL REFERENCES admin(uuid),
--     updated_by UUID NOT NULL REFERENCES admin(uuid),
--     created_at timestamptz NOT NULL DEFAULT NOW(),
--     updated_at timestamptz NOT NULL DEFAULT NOW(),	
-- 	CONSTRAINT admin_role_pk PRIMARY KEY (uuid)
-- );

-- INSERT INTO "admin_role"
--     ("uuid", "role", "created_by", "updated_by")
--     VALUES
-- 	('6f31c195-f37b-4161-9ed8-ebe99a818bdd', 'admin', 'b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6', 'b77a422b-4eb4-42f5-9b92-c33bc8c7d0d6');

-- DELETE FROM admin_role;

-- DROP TABLE admin_role;

-- -- add self reference to admin table, for created_by
-- ALTER TABLE "admin" ADD CONSTRAINT "admin_created_fk" FOREIGN KEY ("created_by") REFERENCES "admin"("uuid");
-- --ALTER TABLE "admin" DROP CONSTRAINT "admin_created_fk";

-- -- add self reference to admin table, for updated_by
-- ALTER TABLE "admin" ADD CONSTRAINT "admin_updated_fk" FOREIGN KEY ("updated_by") REFERENCES "admin"("uuid");
-- --ALTER TABLE "admin" DROP CONSTRAINT "admin_updated_fk";

-- -- add reference to admin_role table, for admin_role
-- ALTER TABLE "admin" ADD CONSTRAINT "admin_role_fk" FOREIGN KEY ("admin_role") REFERENCES "admin_role"("uuid");
-- --ALTER TABLE "admin" DROP CONSTRAINT "admin_role_fk";
