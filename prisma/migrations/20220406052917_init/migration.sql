-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Monitor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Check` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monitor_id` INTEGER NOT NULL,
    `type` ENUM('uptime', 'certificate') NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'up', 'down') NOT NULL DEFAULT 'pending',
    `interval` INTEGER NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `metadata` JSON NULL,
    `checked_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Incident` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `check_id` INTEGER NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `resolved_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Monitor` ADD CONSTRAINT `Monitor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Check` ADD CONSTRAINT `Check_monitor_id_fkey` FOREIGN KEY (`monitor_id`) REFERENCES `Monitor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incident` ADD CONSTRAINT `Incident_check_id_fkey` FOREIGN KEY (`check_id`) REFERENCES `Check`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
