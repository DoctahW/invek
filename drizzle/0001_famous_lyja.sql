CREATE TABLE `investment` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`ticker` text NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`pct_num` real NOT NULL,
	`positive` integer NOT NULL,
	`points` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `investment_userId_idx` ON `investment` (`user_id`);--> statement-breakpoint
CREATE TABLE `portfolio_chart` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`value` real NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `portfolio_chart_userId_idx` ON `portfolio_chart` (`user_id`);