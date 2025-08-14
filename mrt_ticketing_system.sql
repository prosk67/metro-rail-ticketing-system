-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2025 at 08:04 PM
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
-- Database: `metro_ticketing`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `shift` time NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL
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
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `shift` time NOT NULL,
  `station_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `pass`, `shift`, `station_id`) VALUES
(1, 'Syed Ahmed', 'syed@uttara.com', 'pass001', '08:00:00', 1),
(2, 'Nadia Islam', 'nadia@uttara.com', 'pass002', '14:00:00', 1),
(3, 'Raihan Kabir', 'raihan@uttarac.com', 'pass003', '08:00:00', 2),
(4, 'Faria Hossain', 'faria@uttarac.com', 'pass004', '14:00:00', 2),
(5, 'Hasib Rahman', 'hasib@uttaras.com', 'pass005', '08:00:00', 3),
(6, 'Meherun Nahar', 'meherun@uttaras.com', 'pass006', '14:00:00', 3),
(7, 'Zahidul Islam', 'zahid@mirpur11.com', 'pass007', '08:00:00', 4),
(8, 'Sabina Yasmin', 'sabina@mirpur11.com', 'pass008', '14:00:00', 4),
(9, 'Arif Chowdhury', 'arif@mirpur10.com', 'pass009', '08:00:00', 5),
(10, 'Lubna Haque', 'lubna@mirpur10.com', 'pass010', '14:00:00', 5),
(11, 'Mahmudul Hasan', 'mahmud@agargaon.com', 'pass011', '08:00:00', 6),
(12, 'Rokeya Sultana', 'rokeya@agargaon.com', 'pass012', '14:00:00', 6);

-- --------------------------------------------------------

--
-- Table structure for table `mrt_pass`
--

CREATE TABLE `mrt_pass` (
  `id` int(11) NOT NULL,
  `issue_date` date NOT NULL,
  `validity` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mrt_pass`
--

INSERT INTO `mrt_pass` (`id`, `issue_date`, `validity`, `user_id`) VALUES
(25, '2025-06-03', 1, 2),
(26, '2025-06-10', 1, 2),
(27, '2025-08-03', 1, 1),
(28, '2025-07-14', 1, 3),
(29, '2025-07-18', 1, 1),
(30, '2025-07-12', 1, 1),
(31, '2025-05-29', 1, 2),
(32, '2025-08-06', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `rapid_pass`
--

CREATE TABLE `rapid_pass` (
  `id` int(11) NOT NULL,
  `balance` float NOT NULL,
  `validity` tinyint(1) NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rapid_pass`
--

INSERT INTO `rapid_pass` (`id`, `balance`, `validity`, `expiration_date`) VALUES
(1, 500, 1, '2025-09-13'),
(2, 300, 1, '2026-02-06'),
(3, 450.5, 1, '2026-10-13'),
(4, 600.75, 1, '2026-08-06');

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `id` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `distance_from_start` float NOT NULL,
  `end_of_line` tinyint(1) NOT NULL
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
  `src` int(11) NOT NULL,
  `dest` int(11) NOT NULL,
  `fare` float NOT NULL,
  `mrt_pass_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `nid` int(11) NOT NULL,
  `contact` varchar(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rapid_pass_id` int(11) DEFAULT NULL,
  `rapid_pass_status` enum('NOPASS','APPROVED','PENDING') DEFAULT 'NOPASS',
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `nid`, `contact`, `email`, `rapid_pass_id`, `rapid_pass_status`, `password`) VALUES
(1, 'Nafiul Alam', 123456789, '01712345678', 'nafiul.alam@example.com', 1, 'APPROVED', 'passnafiul01'),
(2, 'Shourov Fahad', 987654321, '01987654321', 'fahad.shourov@example.com', 2, 'APPROVED', 'passshourov02'),
(3, 'Johnathan Wikipedia', 456789123, '01811223344', 'john.wick@example.com', 3, 'APPROVED', 'passjohnathan03'),
(4, 'Abdul Fahim', 987612345, '01724378943', 'abdul.fahim@example.com', 4, 'APPROVED', 'passabdul04'),
(5, 'Nafiul Shourov', 456789123, '01725663288', 'nafiul.shourov@example.com', NULL, 'NOPASS', 'passnafishourov05');

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
  ADD KEY `mrt_pass_id` (`mrt_pass_id`),
  ADD KEY `src` (`src`),
  ADD KEY `dest` (`dest`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rapid_pass_id` (`rapid_pass_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `mrt_pass`
--
ALTER TABLE `mrt_pass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `rapid_pass`
--
ALTER TABLE `rapid_pass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `station`
--
ALTER TABLE `station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `trip`
--
ALTER TABLE `trip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `mrt_pass_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `trip`
--
ALTER TABLE `trip`
  ADD CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`mrt_pass_id`) REFERENCES `mrt_pass` (`id`),
  ADD CONSTRAINT `trip_ibfk_2` FOREIGN KEY (`src`) REFERENCES `station` (`id`),
  ADD CONSTRAINT `trip_ibfk_3` FOREIGN KEY (`dest`) REFERENCES `station` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rapid_pass_id`) REFERENCES `rapid_pass` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
