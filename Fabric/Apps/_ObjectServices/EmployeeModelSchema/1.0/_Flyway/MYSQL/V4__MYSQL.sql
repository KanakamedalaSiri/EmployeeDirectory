ALTER TABLE `Employee`
	DROP FOREIGN KEY `15ed1e92761a351ad61f3747c3654b`;
ALTER TABLE `Employee`
	ADD CONSTRAINT `15ed1e92761a351ad61f3747c3654b` FOREIGN KEY(`Department_id`) REFERENCES `Department`(`Department_id`) ON DELETE CASCADE;
