-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2025 at 07:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mrt_ticketig_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `shift` time DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `shift`, `email`, `pass`) VALUES
(1, 'Alice Johnson', '08:00:00', 'alice.johnson@example.com', 'pass123'),
(2, 'Charlie Brown', '12:00:00', 'charlie.brown@example.com', 'admin789'),
(3, 'Diana Prince', '16:00:00', 'diana.prince@example.com', 'wonderwoman');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `shift` time DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `station_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `shift`, `email`, `pass`, `station_id`) VALUES
(1, 'Syed Ahmed', '08:00:00', 'syed@uttara.com', 'pass001', 1),
(2, 'Nadia Islam', '14:00:00', 'nadia@uttara.com', 'pass002', 1),
(3, 'Raihan Kabir', '08:00:00', 'raihan@uttarac.com', 'pass003', 2),
(4, 'Faria Hossain', '14:00:00', 'faria@uttarac.com', 'pass004', 2),
(5, 'Hasib Rahman', '08:00:00', 'hasib@uttaras.com', 'pass005', 3),
(6, 'Meherun Nahar', '14:00:00', 'meherun@uttaras.com', 'pass006', 3),
(7, 'Zahidul Islam', '08:00:00', 'zahid@mirpur11.com', 'pass007', 4),
(8, 'Sabina Yasmin', '14:00:00', 'sabina@mirpur11.com', 'pass008', 4),
(9, 'Arif Chowdhury', '08:00:00', 'arif@mirpur10.com', 'pass009', 5),
(10, 'Lubna Haque', '14:00:00', 'lubna@mirpur10.com', 'pass010', 5),
(11, 'Mahmudul Hasan', '08:00:00', 'mahmud@agargaon.com', 'pass011', 6),
(12, 'Rokeya Sultana', '14:00:00', 'rokeya@agargaon.com', 'pass012', 6);

-- --------------------------------------------------------

--
-- Table structure for table `mrt_pass`
--

CREATE TABLE `mrt_pass` (
  `id` int(11) NOT NULL,
  `issue_date` date DEFAULT NULL,
  `validity` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mrt_pass`
--

INSERT INTO `mrt_pass` (`id`, `issue_date`, `validity`, `user_id`) VALUES
(1, '2025-06-03', 1, 2),
(2, '2025-06-10', 1, 2),
(3, '2025-08-03', 1, 1),
(4, '2025-07-14', 1, 3),
(5, '2025-07-18', 1, 1),
(6, '2025-07-12', 1, 1),
(7, '2025-05-29', 1, 2),
(8, '2025-08-06', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `rapid_pass`
--

CREATE TABLE `rapid_pass` (
  `id` int(11) NOT NULL,
  `balance` float DEFAULT NULL,
  `validity` tinyint(1) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rapid_pass`
--

INSERT INTO `rapid_pass` (`id`, `balance`, `validity`, `expiration_date`) VALUES
(1, 500, 1, '2025-09-13'),
(2, 300, 1, '2026-02-06'),
(3, 450.5, 1, '2026-10-13'),
(6, 600.75, 1, '2026-08-06');

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `id` int(11) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `distance_from_start` float DEFAULT NULL,
  `end_of_line` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`id`, `location`, `availability`, `distance_from_start`, `end_of_line`) VALUES
(1, 'Uttara North', 1, 0, 1),
(2, 'Uttara Center', 1, 2, 0),
(3, 'Uttara South', 1, 5, 0),
(4, 'Mirpur 11', 1, 8, 0),
(5, 'Mirpur 10', 0, 9, 0),
(6, 'Agargaon', 1, 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trip`
--

CREATE TABLE `trip` (
  `id` int(11) NOT NULL,
  `src` int(11) DEFAULT NULL,
  `dest` int(11) DEFAULT NULL,
  `mrt_pass_id` int(11) DEFAULT NULL,
  `fare` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `nid` int(11) DEFAULT NULL,
  `contactno` varchar(11) DEFAULT NULL,
  `rapid_pass_id` int(11) DEFAULT NULL,
  `rapid_pass_status` enum('NOPASS','PENDING','APPROVED','') DEFAULT 'NOPASS',
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `nid`, `contactno`, `rapid_pass_id`, `rapid_pass_status`, `email`) VALUES
(1, 'Nafiul Alam', 123456789, '01712345678', 1, 'APPROVED', 'nafiul.alam@example.com'),
(2, 'Shourov Fahad', 987654321, '01987654321', 2, 'APPROVED', 'fahad.shourov@example.com'),
(3, 'Johnathan Wikipedia', 456789123, '01811223344', 3, 'APPROVED', 'john.wick@example.com'),
(4, 'Abdul Fahim', 987612345, '01724378943', 6, 'APPROVED', 'abdul.fahim@example.com'),
(5, 'Nafiul Shourov', 456789123, '01725663288', NULL, 'NOPASS', 'nafiul.shourov@example.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `station_id` (`station_id`);

--
-- Indexes for table `mrt_pass`
--
ALTER TABLE `mrt_pass`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `rapid_pass`
--
ALTER TABLE `rapid_pass`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `src` (`src`),
  ADD KEY `dest` (`dest`),
  ADD KEY `mrt_pass_id` (`mrt_pass_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `rapid_pass_id` (`rapid_pass_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`);

--
-- Constraints for table `mrt_pass`
--
ALTER TABLE `mrt_pass`
  ADD CONSTRAINT `mrt_pass_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `trip`
--
ALTER TABLE `trip`
  ADD CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`src`) REFERENCES `station` (`id`),
  ADD CONSTRAINT `trip_ibfk_2` FOREIGN KEY (`dest`) REFERENCES `station` (`id`),
  ADD CONSTRAINT `trip_ibfk_3` FOREIGN KEY (`mrt_pass_id`) REFERENCES `mrt_pass` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rapid_pass_id`) REFERENCES `rapid_pass` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
