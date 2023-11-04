DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS plans;

CREATE TABLE roles (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	desc TEXT NOT NULL
);

CREATE TABLE users (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	phone_number TEXT NOT NULL,
	role_id INTEGER NOT NULL,

	FOREIGN KEY (role_id)
		REFERENCES roles (id)
);

CREATE TABLE reports (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	guide_id INTEGER NOT NULL,
	child_id INTEGER NOT NULL,
	interventionist_id INTEGER NOT NULL,
	parent_id INTEGER NOT NULL,
	report_text TEXT NOT NULL,

	FOREIGN KEY (guide_id)
		REFERENCES users (id),

	FOREIGN KEY (child_id)
		REFERENCES users (id),
		
	FOREIGN KEY (interventionist_id)
		REFERENCES users (id),
		
	FOREIGN KEY (parent_id)
		REFERENCES users (id)
);

CREATE TABLE plans (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
	guide_id INTEGER NOT NULL,
	child_id INTEGER NOT NULL,
	interventionist_id INTEGER NOT NULL,
	parent_id INTEGER NOT NULL,
	plan_text TEXT NOT NULL,

	FOREIGN KEY (guide_id)
		REFERENCES users (id),

	FOREIGN KEY (child_id)
		REFERENCES users (id),
		
	FOREIGN KEY (interventionist_id)
		REFERENCES users (id),
		
	FOREIGN KEY (parent_id)
		REFERENCES users (id)
);

INSERT INTO roles (desc) VALUES ("child");
INSERT INTO roles (desc) VALUES ("parent");
INSERT INTO roles (desc) VALUES ("interventionist");
INSERT INTO roles (desc) VALUES ("guide");
INSERT INTO roles (desc) VALUES ("fr5_employee");

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("John Doe", "JohnDoe@gmail.com", "(123) 456-7890", 1)

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Genevieve Wade", "GenevieveWade@gmail.com", "(613) 322-1010", 1)

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Jake Elliott", "JakeElliott@gmail.com", "(106) 819-0100", 1)

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Hazel Cross", "HazelCross@gmail.com", "(163) 910-1362", 2)

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Lana Gilbert", "LanaGilbert@gmail.com", "(471) 913-3573", 2)

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Wilbert Meyer", "WilbertMeyer@gmail.com", "", 2)

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Johnnie Ward", "JohnnieWard@gmail.com", "", 3)

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Jane Doe", "jane.doe@example.com", "(123) 456-7890", 3);

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Jane Smith", "jane.smith@example.com", "(987) 654-3210", 3);

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Alice Johnson", "alice.johnson@example.com", "(555) 555-5555", 4);

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Bob Brown", "bob.brown@example.com", "(444) 444-4444", 4);

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Charlie Wilson", "charlie.wilson@example.com", "(777) 777-7777", 4);

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("David Lee", "david.lee@example.com", "(111) 111-1111", 5);

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Eve Adams", "eve.adams@example.com", "(999) 999-9999", 5);

INSERT INTO users
	(name, email, phone_number, role_id)
	VALUES
	("Frank Garcia", "frank.garcia@example.com", "(666) 666-6666", 5);

INSERT INTO reports
	(guide_id, child_id, interventionist_id, parent_id, report_text)
	VALUES
	(1, 4, 7, 13, "Report for Child John Doe");

INSERT INTO reports
	(guide_id, child_id, interventionist_id, parent_id, report_text)
	VALUES
	(2, 5, 8, 14, "Report for Child Genevieve Wade");

INSERT INTO reports
	(guide_id, child_id, interventionist_id, parent_id, report_text)
	VALUES
	(3, 6, 9, 15, "Report for Child Jake Elliott");

INSERT INTO reports
	(guide_id, child_id, interventionist_id, parent_id, report_text)
	VALUES
	(4, 7, 10, 16, "Report for Child Hazel Cross");

INSERT INTO reports
	(guide_id, child_id, interventionist_id, parent_id, report_text)
	VALUES
	(5, 8, 11, 17, "Report for Child Lana Gilbert");

INSERT INTO reports
	(guide_id, child_id, interventionist_id, parent_id, report_text)
	VALUES
	(6, 9, 12, 18, "Report for Child Wilbert Meyer");