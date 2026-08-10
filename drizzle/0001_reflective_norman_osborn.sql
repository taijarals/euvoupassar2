CREATE TABLE `question_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question_id` integer NOT NULL,
	`selected_index` integer NOT NULL,
	`is_correct` integer NOT NULL,
	`answered_at` text DEFAULT '2026-08-10T16:30:38.309Z' NOT NULL,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`goal_id` integer NOT NULL,
	`source` text NOT NULL,
	`banca` text,
	`statement` text NOT NULL,
	`options` text NOT NULL,
	`correct_index` integer NOT NULL,
	`explanations` text NOT NULL,
	`created_at` text DEFAULT '2026-08-10T16:30:38.308Z' NOT NULL,
	FOREIGN KEY (`goal_id`) REFERENCES `goals`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `goals` ADD `ai_summary` text;