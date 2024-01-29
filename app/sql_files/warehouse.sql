-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2024 at 05:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add permission', 1, 'add_permission'),
(2, 'Can change permission', 1, 'change_permission'),
(3, 'Can delete permission', 1, 'delete_permission'),
(4, 'Can view permission', 1, 'view_permission'),
(5, 'Can add group', 2, 'add_group'),
(6, 'Can change group', 2, 'change_group'),
(7, 'Can delete group', 2, 'delete_group'),
(8, 'Can view group', 2, 'view_group'),
(9, 'Can add content type', 3, 'add_contenttype'),
(10, 'Can change content type', 3, 'change_contenttype'),
(11, 'Can delete content type', 3, 'delete_contenttype'),
(12, 'Can view content type', 3, 'view_contenttype'),
(13, 'Can add session', 4, 'add_session'),
(14, 'Can change session', 4, 'change_session'),
(15, 'Can delete session', 4, 'delete_session'),
(16, 'Can view session', 4, 'view_session'),
(17, 'Can add customer', 5, 'add_customer'),
(18, 'Can change customer', 5, 'change_customer'),
(19, 'Can delete customer', 5, 'delete_customer'),
(20, 'Can view customer', 5, 'view_customer'),
(21, 'Can add outbound', 6, 'add_outbound'),
(22, 'Can change outbound', 6, 'change_outbound'),
(23, 'Can delete outbound', 6, 'delete_outbound'),
(24, 'Can view outbound', 6, 'view_outbound'),
(25, 'Can add supplier', 7, 'add_supplier'),
(26, 'Can change supplier', 7, 'change_supplier'),
(27, 'Can delete supplier', 7, 'delete_supplier'),
(28, 'Can view supplier', 7, 'view_supplier'),
(29, 'Can add inbound', 8, 'add_inbound'),
(30, 'Can change inbound', 8, 'change_inbound'),
(31, 'Can delete inbound', 8, 'delete_inbound'),
(32, 'Can view inbound', 8, 'view_inbound'),
(33, 'Can add product', 9, 'add_product'),
(34, 'Can change product', 9, 'change_product'),
(35, 'Can delete product', 9, 'delete_product'),
(36, 'Can view product', 9, 'view_product'),
(37, 'Can add tag', 10, 'add_tag'),
(38, 'Can change tag', 10, 'change_tag'),
(39, 'Can delete tag', 10, 'delete_tag'),
(40, 'Can view tag', 10, 'view_tag'),
(41, 'Can add product_ tag', 11, 'add_product_tag'),
(42, 'Can change product_ tag', 11, 'change_product_tag'),
(43, 'Can delete product_ tag', 11, 'delete_product_tag'),
(44, 'Can view product_ tag', 11, 'view_product_tag'),
(45, 'Can add user', 12, 'add_user'),
(46, 'Can change user', 12, 'change_user'),
(47, 'Can delete user', 12, 'delete_user'),
(48, 'Can view user', 12, 'view_user');

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(2, 'auth', 'group'),
(1, 'auth', 'permission'),
(3, 'contenttypes', 'contenttype'),
(8, 'inbounds', 'inbound'),
(7, 'inbounds', 'supplier'),
(5, 'outbounds', 'customer'),
(6, 'outbounds', 'outbound'),
(9, 'products', 'product'),
(11, 'products', 'product_tag'),
(10, 'products', 'tag'),
(4, 'sessions', 'session'),
(12, 'users', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-01-26 11:53:46.364844'),
(2, 'contenttypes', '0002_remove_content_type_name', '2024-01-26 11:53:46.410630'),
(3, 'auth', '0001_initial', '2024-01-26 11:53:46.590315'),
(4, 'auth', '0002_alter_permission_name_max_length', '2024-01-26 11:53:46.643119'),
(5, 'auth', '0003_alter_user_email_max_length', '2024-01-26 11:53:46.648374'),
(6, 'auth', '0004_alter_user_username_opts', '2024-01-26 11:53:46.648374'),
(7, 'auth', '0005_alter_user_last_login_null', '2024-01-26 11:53:46.661976'),
(8, 'auth', '0006_require_contenttypes_0002', '2024-01-26 11:53:46.661976'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2024-01-26 11:53:46.678991'),
(10, 'auth', '0008_alter_user_username_max_length', '2024-01-26 11:53:46.678991'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2024-01-26 11:53:46.678991'),
(12, 'auth', '0010_alter_group_name_max_length', '2024-01-26 11:53:46.695194'),
(13, 'auth', '0011_update_proxy_permissions', '2024-01-26 11:53:46.695194'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2024-01-26 11:53:46.707738'),
(15, 'inbounds', '0001_initial', '2024-01-26 11:53:46.757765'),
(16, 'outbounds', '0001_initial', '2024-01-26 11:53:46.759361'),
(17, 'outbounds', '0002_outbound', '2024-01-26 11:53:46.826910'),
(18, 'products', '0001_initial', '2024-01-26 11:53:46.841228'),
(19, 'products', '0002_product_tag', '2024-01-26 11:53:46.878713'),
(20, 'products', '0003_alter_product_tag_unique_together_and_more', '2024-01-26 11:53:47.034825'),
(21, 'products', '0004_remove_product_tag_product_sku_tag_id_unique_and_more', '2024-01-26 11:53:47.169904'),
(22, 'sessions', '0001_initial', '2024-01-26 11:53:47.193434'),
(23, 'users', '0001_initial', '2024-01-26 11:53:47.195130'),
(24, 'users', '0002_remove_user_id_user_last_login_alter_user_user_id', '2024-01-26 11:53:47.247021'),
(25, 'users', '0003_rename_role_user_user_type', '2024-01-26 11:53:47.247021'),
(26, 'users', '0004_alter_user_options_alter_user_managers_and_more', '2024-01-26 11:53:47.591767'),
(27, 'users', '0005_alter_user_options_alter_user_managers_and_more', '2024-01-26 11:53:47.720030'),
(28, 'users', '0006_alter_user_password_alter_user_user_id_and_more', '2024-01-26 11:53:47.726064'),
(29, 'users', '0007_alter_user_options_alter_user_name_and_more', '2024-01-26 11:53:47.733215'),
(30, 'users', '0008_alter_user_options', '2024-01-26 11:53:47.736172'),
(31, 'users', '0009_alter_user_options', '2024-01-26 11:54:31.175798'),
(32, 'inbounds', '0002_alter_inbound_id_alter_supplier_supplier_id', '2024-01-27 09:11:49.352427'),
(33, 'outbounds', '0003_alter_customer_customer_id_alter_outbound_id', '2024-01-27 09:11:49.741639'),
(34, 'products', '0005_alter_tag_tag_id', '2024-01-27 09:11:50.075331'),
(35, 'users', '0010_alter_user_user_id', '2024-01-27 09:11:50.117748'),
(36, 'products', '0006_delete_product_tag_delete_tag', '2024-01-27 22:25:46.905764');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('atbl83ofzilnoyzsi25vl971gq0b1kg4', 'e30:1rTLly:SJAy3SGxyf9amk2MptLz04VbLBga7ABY-BoqabUiba0', '2024-02-09 12:57:30.858638'),
('dzo6nk4swnwx7nm22orhir0e7u9si9pn', 'e30:1rTLeZ:SMatL1y7rQRm7c-G08_q4IKXPFJAKHzyDSUpuB5mqTs', '2024-02-09 12:49:51.924920'),
('mgtx0tvoblhojfglpu3dt1k8s0ssqm9i', 'e30:1rU7dZ:PwE-ESMkLaF7jy_pUYxctIIrZpWn0Z4jbM5-04PPWn8', '2024-02-11 16:04:01.081058'),
('qs1kruw53qlolhlfac5jhqtv5zwqwdg2', '.eJxVjMsOwiAQRf-FtSEwUx516d5vIAMMUjU0Ke3K-O_apAvd3nPOfYlA21rD1nkJUxZnoQFQnH7nSOnBbWf5Tu02yzS3dZmi3BV50C6vc-bn5XD_Dir1-q2TcwQ-kfOqjEAYEYGNZ02mRGOMRxzRss7KJp1ttKxKGQiUK4P3BcX7A0s9OD8:1rU8FU:cg4X2bOf04vGjcsyfR8zzp3oH_OVq2PMM3U1418yJ48', '2024-02-11 16:43:12.673348'),
('rlpk5b9nkq06hg44d3puj3zlqpx52792', '.eJxVjEEOwiAQRe_C2hAYgVKX7nsGAjODVA0kpV0Z765NutDtf-_9lwhxW0vYOi9hJnERGkCL0--cIj647ozusd6axFbXZU5yV-RBu5wa8fN6uH8HJfbyrZHQKx6TZ-vdkC34bDNEIG0cUiQFSqMdnGUa2bDLQISKjGc2WfNZvD9tBzlk:1rTL7a:4VFQJ5kfBIevoETpixQan4lbfU6VLGGR9BvDli9AyYg', '2024-02-09 12:15:46.042729'),
('yit632x8a5yw51af67azxtg2uizrfozh', '.eJxVjEEOwiAQRe_C2hAYgVKX7nsGAjODVA0kpV0Z765NutDtf-_9lwhxW0vYOi9hJnERGkCL0--cIj647ozusd6axFbXZU5yV-RBu5wa8fN6uH8HJfbyrZHQKx6TZ-vdkC34bDNEIG0cUiQFSqMdnGUa2bDLQISKjGc2WfNZvD9tBzlk:1rTLuB:qr9GQNJYuuqiPYhSfoZKQCOXwjswBxHi7E_WbwiojiA', '2024-02-09 13:05:59.253067'),
('yr5svxu22stvj8njd5p2sf5s1c1d2utl', 'e30:1rTLra:2nIi2hmbI4mCabaBlAbI5AlMQ_mMtnXPMTNSd0gJLGs', '2024-02-09 13:03:18.034241');

-- --------------------------------------------------------

--
-- Table structure for table `inbounds_inbound`
--

CREATE TABLE `inbounds_inbound` (
  `id` bigint(20) NOT NULL,
  `reference` varchar(15) NOT NULL,
  `date_received` datetime(6) NOT NULL,
  `product_sku` varchar(10) NOT NULL,
  `quantity` bigint(20) NOT NULL,
  `location` varchar(150) NOT NULL,
  `remarks` varchar(250) NOT NULL,
  `supplier_id_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inbounds_inbound`
--

INSERT INTO `inbounds_inbound` (`id`, `reference`, `date_received`, `product_sku`, `quantity`, `location`, `remarks`, `supplier_id_id`) VALUES
(1, 'INBOUND001', '2022-01-04 21:33:33.000000', 'PRD001', 100, 'Storage A', '', 2130),
(2, 'INBOUND002', '2023-10-02 21:35:32.000000', 'PRD002', 300, 'Storage D', '', 2130),
(3, 'INBOUND003', '2024-01-25 21:35:32.000000', 'PRD003', 2000, 'Storage B', '', 2128),
(4, 'INBOUND004', '2017-11-30 21:35:32.000000', 'PRD004', 400, 'Storage A', '', 2129),
(5, 'INBOUND005', '2022-11-15 21:35:32.000000', 'PRD004', 20, 'Storage C', '', 2131);

-- --------------------------------------------------------

--
-- Table structure for table `inbounds_supplier`
--

CREATE TABLE `inbounds_supplier` (
  `supplier_id` bigint(20) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inbounds_supplier`
--

INSERT INTO `inbounds_supplier` (`supplier_id`, `name`, `email`) VALUES
(2128, 'Amiraa', 'amira32.ie@gmail.com'),
(2129, 'Harun', 'harun23@yahoo.com'),
(2130, 'Wani', 'wani44@outloo.com'),
(2131, 'Farukh', 'farukh.ee@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `outbounds_customer`
--

CREATE TABLE `outbounds_customer` (
  `customer_id` bigint(20) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `outbounds_customer`
--

INSERT INTO `outbounds_customer` (`customer_id`, `name`, `email`) VALUES
(12421, 'Khan', 'khan12@gmail.com'),
(12422, 'Karim', 'karim@outlook.com'),
(12423, 'Sana', 'sana99@yahoo.com'),
(12424, 'Siva', 'siva87@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `outbounds_outbound`
--

CREATE TABLE `outbounds_outbound` (
  `id` bigint(20) NOT NULL,
  `reference` varchar(15) NOT NULL,
  `date_received` datetime(6) NOT NULL,
  `product_sku` varchar(10) NOT NULL,
  `quantity` bigint(20) NOT NULL,
  `destination` varchar(150) NOT NULL,
  `remarks` varchar(250) NOT NULL,
  `customer_id_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `outbounds_outbound`
--

INSERT INTO `outbounds_outbound` (`id`, `reference`, `date_received`, `product_sku`, `quantity`, `destination`, `remarks`, `customer_id_id`) VALUES
(1, 'OUTBOUND001', '2021-02-04 21:33:33.000000', 'PRD001', 300, 'ABC Company', '', 12421),
(2, 'OUTBOUND002', '2013-10-31 18:35:32.000000', 'PRD002', 4000, '123 Store', '', 12421),
(3, 'OUTBOUND003', '2022-11-28 06:54:00.000000', 'PRD003', 100, '987 Store', '', 12422),
(4, 'OUTBOUND004', '2023-04-04 04:55:11.000000', 'PRD004', 500, 'XYZ Company', '', 12423),
(5, 'OUTBOUND005', '2024-01-02 00:54:23.000000', 'PRD005', 40, 'JKL Store', '', 12424);

-- --------------------------------------------------------

--
-- Table structure for table `products_product`
--

CREATE TABLE `products_product` (
  `product_sku` varchar(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `quantity` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products_product`
--

INSERT INTO `products_product` (`product_sku`, `name`, `description`, `price`, `quantity`) VALUES
('PRD001', 'Apple iPhone 8', 'The new iPhone features a new glass and aluminum design in three beautiful colors made out of the most durable glass ever in a smartphone, Retina HD displays and A11 Bionic chip, and is designed for the ultimate augmented reality experience. The world’s most popular camera gets even better with single and dual cameras featuring Portrait Lighting on iPhone 8 Plus, and wireless charging brings a powerful new capability to iPhone.', 1500.00, 5000),
('PRD002', 'Ergonomic Chair', 'The AIRFLEX Ergochair revolutionizes backrest design with its distinctive, spine-shaped construction. This seamless structure, extending from the lumbar area to the neck without an intrusive headrest, mirrors the natural curvature of the spine for ideal alignment. Coupled with breathable mesh material, it guarantees an exceptionally comfortable seating experience.', 329.00, 200),
('PRD003', 'Nike Air Max 270', 'Refresh your rotation with these men\'s Air Max 270 sneakers by Nike. In an Anthracite colorway, these treads have a breathable knit upper with smooth synthetic skin details for durable wear. They feature a webbed lace system and a plush padded collar for a locked-in fit, with a woven pull loop at the heel.', 709.00, 300),
('PRD004', 'Samsung Galaxy S21', 'Never miss that perfect shot again. Meet Galaxy S21 5G. Designed to revolutionize video and photography, with beyond cinematic 8K resolution so you can snap epic photos right out of video. It has it all: 64MP, our fastest chipset and a massive all-day battery. Things just got epic.', 5205.00, 1000),
('PRD005', 'Basic White Tees', 'Basic white t-shirts are a versatile wardrobe staple that can be worn in many different ways. They can be layered in colder weather and worn comfortably in warmer weather. They can also be dressed up or down, and can be worn for formal or casual occasions. ', 152.00, 5000);

-- --------------------------------------------------------

--
-- Table structure for table `users_user`
--

CREATE TABLE `users_user` (
  `user_id` bigint(20) NOT NULL,
  `password` varchar(250) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_user`
--

INSERT INTO `users_user` (`user_id`, `password`, `user_type`, `last_login`, `name`) VALUES
(1221, 'pbkdf2_sha256$720000$gf0w8MsjfxUGBSo9mXs4s2$wFrEQ9kqpDLLD/gv2qBZRvLbky6/FZYM+n5CBQc81HE=', 'Warehouse Manager', '2024-01-28 16:42:46.498433', 'Ali'),
(1222, 'pbkdf2_sha256$720000$Fl9J7lnyCOJHS4wZ70ibdA$L2nvZYBPoPAXoldpAIB61g4zCYcPjziqsuqyzJ9l3o8=', 'Warehouse Manager', '2023-02-02 17:51:04.789463', 'Abu'),
(1223, 'pbkdf2_sha256$720000$THeLwJgMjf8KevoF0XVzhO$PX1qQv3ezDgOLOKv29GeRnIctzSZDPLUNeQUre9xroQ=', 'Operator', '2024-01-28 16:43:57.480273', 'Khairul'),
(1224, 'pbkdf2_sha256$720000$s4YQtpKklxmR1so6oIrQ8T$FaAUhVC9MDJ64uBfCc+V5oAxfZ4mwobPerOBoUCGebA=', 'Operator', '2024-01-26 17:51:04.789463', 'Nurul Amria');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `inbounds_inbound`
--
ALTER TABLE `inbounds_inbound`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inbounds_inbound_supplier_id_id_0de4ef91_fk` (`supplier_id_id`);

--
-- Indexes for table `inbounds_supplier`
--
ALTER TABLE `inbounds_supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `outbounds_customer`
--
ALTER TABLE `outbounds_customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `outbounds_outbound`
--
ALTER TABLE `outbounds_outbound`
  ADD PRIMARY KEY (`id`),
  ADD KEY `outbounds_outbound_customer_id_id_253bb4fe_fk` (`customer_id_id`);

--
-- Indexes for table `products_product`
--
ALTER TABLE `products_product`
  ADD PRIMARY KEY (`product_sku`);

--
-- Indexes for table `users_user`
--
ALTER TABLE `users_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `inbounds_inbound`
--
ALTER TABLE `inbounds_inbound`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `inbounds_supplier`
--
ALTER TABLE `inbounds_supplier`
  MODIFY `supplier_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2133;

--
-- AUTO_INCREMENT for table `outbounds_customer`
--
ALTER TABLE `outbounds_customer`
  MODIFY `customer_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12426;

--
-- AUTO_INCREMENT for table `outbounds_outbound`
--
ALTER TABLE `outbounds_outbound`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users_user`
--
ALTER TABLE `users_user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1226;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `inbounds_inbound`
--
ALTER TABLE `inbounds_inbound`
  ADD CONSTRAINT `inbounds_inbound_supplier_id_id_0de4ef91_fk` FOREIGN KEY (`supplier_id_id`) REFERENCES `inbounds_supplier` (`supplier_id`);

--
-- Constraints for table `outbounds_outbound`
--
ALTER TABLE `outbounds_outbound`
  ADD CONSTRAINT `outbounds_outbound_customer_id_id_253bb4fe_fk` FOREIGN KEY (`customer_id_id`) REFERENCES `outbounds_customer` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
