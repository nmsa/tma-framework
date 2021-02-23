CREATE TABLE logs (
	logtime	 TIMESTAMP NOT NULL,
	origin	 VARCHAR(512) NOT NULL,
	originid	 INTEGER,
	description	 VARCHAR(512),
	previousvalue VARCHAR(512),
	newvalue	 VARCHAR(512),
	component	 VARCHAR(512) NOT NULL,
	loggroupid	 INTEGER,
	target	 VARCHAR(512),
	targetid	 INTEGER,
	PRIMARY KEY(logtime)
);