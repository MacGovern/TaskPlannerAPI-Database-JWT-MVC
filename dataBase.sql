CREATE SCHEMA task_planner;

CREATE TABLE task_planner.users(
    email VARCHAR(320) NOT NULL,
    `password` CHAR(60) NOT NULL,
    PRIMARY KEY(email)
);

CREATE TABLE task_planner.tasks(
	id INT NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(320) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`description` VARCHAR(200),
	created_at DATETIME(3) NOT NULL,
	updated_at DATETIME(3) NOT NULL,
	`status` ENUM('To-Do', 'In Progress', 'Completed', 'Cancelled', 'Deferred', 'Urgent') NOT NULL DEFAULT 'To-Do',
	PRIMARY KEY(id),
    FOREIGN KEY(`user`) REFERENCES task_planner.users(email)
);

DELIMITER $$
CREATE TRIGGER task_planner.before_tasks_insert
BEFORE INSERT ON task_planner.tasks
FOR EACH ROW
BEGIN
	IF ((NEW.`status` NOT IN ('Cancelled', 'Completed')) AND (NEW.`name`, NEW.`description`) IN (
		SELECT `name`, `description`
		FROM task_planner.tasks
		WHERE `status` NOT IN ('Cancelled', 'Completed')
	)) THEN
		SIGNAL SQLSTATE '45000' -- Unhandled user-defined exception. https://dev.mysql.com/doc/refman/8.0/en/signal.html
		SET MESSAGE_TEXT = 'A task with the same name and description already exists.';
	END IF;
END;
$$

CREATE TRIGGER task_planner.before_tasks_update
BEFORE UPDATE ON task_planner.tasks
FOR EACH ROW
BEGIN
	IF NEW.`status` = 'To-Do' AND OLD.`status` <> 'To-Do' THEN
        	SIGNAL SQLSTATE '45000' -- Unhandled user-defined exception. https://dev.mysql.com/doc/refman/8.0/en/signal.html
        	SET MESSAGE_TEXT = 'Cannot update status to To-Do once it has already been changed.';
    	END IF;
END;
$$
DELIMITER ;