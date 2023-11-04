DROP TABLE IF EXISTS parents;
DROP TABLE IF EXISTS guides;
DROP TABLE IF EXISTS children;
DROP TABLE IF EXISTS records;
DROP TABLE IF EXISTS interventionists;
DROP TABLE IF EXISTS fr5_employees;
DROP TABLE IF EXISTS organizations;

CREATE TABLE guides (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	phone_number TEXT NOT NULL
);



CREATE TABLE guides (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	phone_number TEXT NOT NULL
);

CREATE TABLE children (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	parent_id INTEGER NOT NULL,
	guide_id INTEGER NOT NULL,
	
	FOREIGN KEY (parent_id)
		REFERENCES parents (id),
		
	FOREIGN KEY (guide_id)
		REFERENCES guides (id)
);

CREATE TABLE records(
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	child_id INTEGER NOT NULL,
	interventionist_id INTEGER NOT NULL,
	content TEXT,
	
	FOREIGN KEY (child_id)
		REFERENCES children (id),
		
	FOREIGN KEY (interventionist_id)
		REFERENCES interventionists (id)
);

CREATE TABLE interventionists (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	speciality TEXT NOT NULL,
	email TEXT,
	phone number TEXT,
	name TEXT,
	organization_id INTEGER
);

CREATE TABLE fr5_employees (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT
);

CREATE TABLE interventionist_connections (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	child_id INTEGER NOT NULL,
	interventionist_id INTEGER NOT NULL,
	
	FOREIGN KEY (child_id)
		REFERENCES children (id),
		
	FOREIGN KEY (interventionist_id)
		REFERENCES interventionists (id)
);

CREATE TABLE organizations (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	location TEXT,
	email TEXT,
	phone_number TEXT
);