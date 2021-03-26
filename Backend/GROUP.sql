-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2021 at 08:32 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignment_id` int(10) NOT NULL,
  `module_id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `deadline` datetime NOT NULL,
  `content` longtext NOT NULL,
  `semester` int(5) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignment_id`, `module_id`, `title`, `deadline`, `content`, `semester`, `isActive`) VALUES
(3, 2006, 'Swing GUI Vehicle rental', '2021-04-22 23:59:59', 'Go to this link google.com', 4, 1),
(11, 2004, 'Second term ', '2021-04-09 14:26:00', 'You are a back end developer for a web development agency. A local newspaper wants you to build a\r\nwebsite which they can post news articles to. The front end developer has supplied an HTML layout with\r\nthe relevant CSS and Images. This has been signed off by the client and should be used for the look of\r\nthe website.', 4, 1),
(12, 2004, 'Test assignment', '2021-05-06 20:27:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus vulputate sapien, nec fringilla turpis. Vestibulum maximus porttitor porta. Quisque consequat elementum venenatis. Quisque vestibulum ornare ullamcorper. Aliquam purus orci, molestie ut dapibus quis, vulputate a est. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ut lacus a nisi porttitor interdum quis id quam.', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `attendancemodules`
--

CREATE TABLE `attendancemodules` (
  `attendance_modules_id` int(10) NOT NULL,
  `module_id` int(10) NOT NULL,
  `attendance_time` datetime NOT NULL,
  `semester` int(10) NOT NULL,
  `attendance_status` tinyint(4) NOT NULL,
  `week` int(11) NOT NULL,
  `class_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendancemodules`
--

INSERT INTO `attendancemodules` (`attendance_modules_id`, `module_id`, `attendance_time`, `semester`, `attendance_status`, `week`, `class_type`) VALUES
(1, 2002, '2021-02-09 07:00:46', 4, 0, 1, 'Lecture'),
(5, 2004, '2020-03-02 07:00:46', 4, 0, 1, 'Lecture'),
(8, 2002, '2020-03-02 07:00:46', 4, 0, 2, 'Lecture'),
(9, 2005, '2020-03-02 07:00:46', 4, 0, 2, 'Lecture'),
(15, 2004, '2021-03-07 10:19:00', 4, 0, 3, 'Lecture'),
(21, 2004, '2021-03-19 13:35:00', 4, 0, 6, 'Lecture'),
(24, 2004, '2021-03-20 21:29:00', 4, 0, 6, 'Lecture');

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `attendance_id` int(10) NOT NULL,
  `attendance_module_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `attendance_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`attendance_id`, `attendance_module_id`, `student_id`, `attendance_time`) VALUES
(9, 5, 1, '2021-03-01 21:03:45'),
(12, 9, 1, '2021-03-01 21:03:57'),
(22, 15, 1, '2021-03-07 09:19:39'),
(23, 21, 1, '2021-03-19 13:36:01'),
(24, 24, 1, '2021-03-26 10:29:56');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(10) NOT NULL,
  `course_head_staff_id` int(10) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `start_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_head_staff_id`, `course_name`, `start_date`) VALUES
(101, 1, 'Bsc. Computing', '2020-08-22 00:00:00'),
(102, 3, 'BBA', '2021-02-19 17:38:39');

-- --------------------------------------------------------

--
-- Table structure for table `diaries`
--

CREATE TABLE `diaries` (
  `diary_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` mediumtext NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diaries`
--

INSERT INTO `diaries` (`diary_id`, `student_id`, `title`, `body`, `date_created`) VALUES
(13, 1, 'My first diary', 'Hello this is my first diary.', '2021-03-26 10:29:49');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `staff_id` int(10) NOT NULL,
  `sent_by` varchar(255) NOT NULL,
  `sent_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `module_id` int(10) NOT NULL,
  `course_id` int(10) NOT NULL,
  `module_name` varchar(100) NOT NULL,
  `module_credit` int(2) NOT NULL,
  `module_level` int(5) NOT NULL,
  `ass_1` varchar(5) NOT NULL,
  `ass_2` varchar(5) NOT NULL,
  `exam` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`module_id`, `course_id`, `module_name`, `module_credit`, `module_level`, `ass_1`, `ass_2`, `exam`) VALUES
(1001, 101, 'Computing Mathematics', 20, 1, '50%', '-', '50%'),
(2002, 101, 'Software Implementation 2', 20, 2, '40%', '-', '60%'),
(2004, 101, 'Formal Specification of Software Systems 1', 20, 2, '40%', '-', '60%'),
(2005, 101, 'Database Technology ', 20, 2, '40%', '-', '60%'),
(2006, 101, 'Group Project and Project Management', 20, 2, '100%', '-', '-'),
(3001, 102, 'Economics', 120, 2, '100%', '-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `module_materials`
--

CREATE TABLE `module_materials` (
  `module_materials_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` mediumtext NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `module_materials`
--

INSERT INTO `module_materials` (`module_materials_id`, `module_id`, `title`, `body`, `datetime_added`) VALUES
(1, 2004, 'Chapter 1', 'In this chapter, we are going to learn how we can use mathematics to build complex software systems.\r\n\r\nIt is recommended that you go through following material before taking the class:\r\nhttps://www.unf.edu/~ncoulter/cen6070/handouts/specifications.pdf\r\n', '2021-03-27 00:07:23'),
(2, 2004, 'Chapter 2', 'Chapter Two is a 1979 American Metrocolor romantic comedy film directed by Robert Moore, produced by Ray Stark, and based on Neil Simon\'s 1977 ... ( - Wikipedia)', '2021-03-27 01:08:41'),
(3, 2005, 'Chapter 1', 'Database : is collection of data, typically describing the activities of one or more related organizations. DBMS : or database management system, is...', '2021-03-27 01:08:41'),
(4, 2006, 'Chapter 1', 'Project Background, Objectives, and Research Approach: TRB\'s National Cooperative Highway Research Program (NCHRP) Report...', '2021-03-27 01:08:41');

-- --------------------------------------------------------

--
-- Table structure for table `personaltutor`
--

CREATE TABLE `personaltutor` (
  `personal_tutor_id` int(10) NOT NULL,
  `staff_id` int(10) NOT NULL,
  `semester` int(11) NOT NULL,
  `course_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personaltutor`
--

INSERT INTO `personaltutor` (`personal_tutor_id`, `staff_id`, `semester`, `course_id`) VALUES
(1, 4, 4, 101);

-- --------------------------------------------------------

--
-- Table structure for table `routinemodules`
--

CREATE TABLE `routinemodules` (
  `routine_modules_id` int(10) NOT NULL,
  `routine_id` int(10) NOT NULL,
  `module_id` int(10) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `routinemodules`
--

INSERT INTO `routinemodules` (`routine_modules_id`, `routine_id`, `module_id`, `start_time`, `end_time`) VALUES
(1, 1, 2004, '07:00:00', '09:30:00'),
(2, 1, 2005, '11:00:00', '12:30:00'),
(5, 2, 2005, '09:00:00', '11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `routines`
--

CREATE TABLE `routines` (
  `routine_id` int(10) NOT NULL,
  `day` varchar(255) NOT NULL,
  `course_id` int(10) NOT NULL,
  `class_type` varchar(255) NOT NULL,
  `semester` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `routines`
--

INSERT INTO `routines` (`routine_id`, `day`, `course_id`, `class_type`, `semester`) VALUES
(1, 'Sunday', 101, 'Lecture', 4),
(2, 'Monday', 101, 'Tutorial', 4),
(3, 'Sunday', 101, 'Tutorial', 4);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `date_of_join` datetime NOT NULL,
  `course_id` int(10) NOT NULL,
  `module_id` int(10) NOT NULL,
  `salary` int(10) NOT NULL,
  `role` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `name`, `surname`, `email`, `address`, `date_of_join`, `course_id`, `module_id`, `salary`, `role`, `password`) VALUES
(1, 'Thomas', 'Smith', 'tomsmith@gmail.com', 'Somewhere_in_UK', '2016-03-11 00:00:00', 101, 1001, 2000, 'Head Of Computing', '$2b$12$ZehgVeUwRFW.QFmpB6mQWOXpXq.LkN.p1r.U3AWxPetDg5LsgwoSm'),
(2, 'Michael', 'Jackson', 'michael', 'Jorpati', '2020-02-03 00:00:00', 101, 2005, 23223, 'Database Technology Tutor', '$2b$12$ksCMs0OUGbGy/pGHkXYcmujYKDEzH1S2/9S7pVLw6RiNhTPL6n7ui'),
(4, 'Helen ', 'W Bluhm', 'staff', '3932  Kenwood Place', '2017-02-21 00:00:00', 101, 2004, 5000, 'Software Engineering Teacher', '$2b$12$ksCMs0OUGbGy/pGHkXYcmujYKDEzH1S2/9S7pVLw6RiNhTPL6n7ui'),
(5, 'Carole ', 'S Fairley', 'hlzjsku5lhr@temporary-mail.net', 'North Carolina', '2014-05-15 00:00:00', 101, 2006, 2340, 'Group Project Teacher', '$2b$12$sL32BActEQmrvaHtVpCX9uFnGlWXgYgydOusY2XL2b7dEGMqEUCV6'),
(7, 'Sujal', 'Gautam', 'sgautam@gmail.com', 'Bhairahawa-Nepal', '2020-01-21 22:30:11', 102, 3001, 33423, 'Tutor', 'pass');

-- --------------------------------------------------------

--
-- Table structure for table `staffdiaries`
--

CREATE TABLE `staffdiaries` (
  `diary_id` int(10) NOT NULL,
  `staff_id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` mediumtext NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staffdiaries`
--

INSERT INTO `staffdiaries` (`diary_id`, `staff_id`, `title`, `body`, `date_created`) VALUES
(4, 4, 'New Diary', 'Created new diary', '2021-03-20 15:40:48');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(10) NOT NULL,
  `course_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `gender` char(1) NOT NULL,
  `date_of_birth` date NOT NULL,
  `registration_year` date NOT NULL,
  `student_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `course_id`, `name`, `email`, `password`, `surname`, `address`, `phone`, `gender`, `date_of_birth`, `registration_year`, `student_status`) VALUES
(1, 101, 'Kushal', 'kushal', '$2b$12$ksCMs0OUGbGy/pGHkXYcmujYKDEzH1S2/9S7pVLw6RiNhTPL6n7ui', 'Upreti', 'Jorpati', '+977-3342342555', 'F', '2000-02-14', '2019-03-21', 'Live');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `submission_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `assignment_id` int(10) NOT NULL,
  `submission_date` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`submission_id`, `student_id`, `assignment_id`, `submission_date`, `title`, `content`) VALUES
(2, 1, 3, '2021-03-18 20:55:37', 'Assignment 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus vulputate sapien, nec fringilla turpis. Vestibulum maximus porttitor porta. Quisque consequat elementum venenatis. Quisque vestibulum ornare ullamcorper. Aliquam purus orci, molestie ut dapibus quis, vulputate a est. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ut lacus a nisi porttitor interdum quis id quam.'),
(8, 1, 12, '2021-03-20 20:34:58', 'Assignment 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus vulputate sapien, nec fringilla turpis. Vestibulum maximus porttitor porta. Quisque consequat elementum venenatis. Quisque vestibulum ornare ullamcorper. Aliquam purus orci, molestie ut dapibus quis, vulputate a est. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ut lacus a nisi porttitor interdum quis id quam.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `attendancemodules`
--
ALTER TABLE `attendancemodules`
  ADD PRIMARY KEY (`attendance_modules_id`),
  ADD KEY `fk_m_attendancemodules` (`module_id`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `attendance_module_id` (`attendance_module_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `diaries`
--
ALTER TABLE `diaries`
  ADD PRIMARY KEY (`diary_id`),
  ADD KEY `fk_s_id` (`student_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`module_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `module_materials`
--
ALTER TABLE `module_materials`
  ADD PRIMARY KEY (`module_materials_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `personaltutor`
--
ALTER TABLE `personaltutor`
  ADD PRIMARY KEY (`personal_tutor_id`),
  ADD KEY `fk_s_personaltutor` (`staff_id`),
  ADD KEY `kf_c_personaltutor` (`course_id`);

--
-- Indexes for table `routinemodules`
--
ALTER TABLE `routinemodules`
  ADD PRIMARY KEY (`routine_modules_id`),
  ADD KEY `fk_r_routinemodules` (`routine_id`),
  ADD KEY `fk_m_routinemoudles` (`module_id`);

--
-- Indexes for table `routines`
--
ALTER TABLE `routines`
  ADD PRIMARY KEY (`routine_id`),
  ADD KEY `fk_c_routines` (`course_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `password` (`password`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `fk_m_staff` (`module_id`);

--
-- Indexes for table `staffdiaries`
--
ALTER TABLE `staffdiaries`
  ADD PRIMARY KEY (`diary_id`),
  ADD KEY `fk_s_id` (`staff_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `fk_a_submissions` (`assignment_id`),
  ADD KEY `fk_s_submissions` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `attendancemodules`
--
ALTER TABLE `attendancemodules`
  MODIFY `attendance_modules_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `attendance_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `diaries`
--
ALTER TABLE `diaries`
  MODIFY `diary_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `module_materials`
--
ALTER TABLE `module_materials`
  MODIFY `module_materials_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personaltutor`
--
ALTER TABLE `personaltutor`
  MODIFY `personal_tutor_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `routinemodules`
--
ALTER TABLE `routinemodules`
  MODIFY `routine_modules_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `routines`
--
ALTER TABLE `routines`
  MODIFY `routine_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `staffdiaries`
--
ALTER TABLE `staffdiaries`
  MODIFY `diary_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `submission_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `fk_m_assignments` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`);

--
-- Constraints for table `attendancemodules`
--
ALTER TABLE `attendancemodules`
  ADD CONSTRAINT `fk_m_attendancemodules` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`);

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `fk_a_attendances` FOREIGN KEY (`attendance_module_id`) REFERENCES `attendancemodules` (`attendance_modules_id`),
  ADD CONSTRAINT `fk_s_attendances` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- Constraints for table `diaries`
--
ALTER TABLE `diaries`
  ADD CONSTRAINT `fk_s_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `module_materials`
--
ALTER TABLE `module_materials`
  ADD CONSTRAINT `module_materials_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`) ON DELETE CASCADE;

--
-- Constraints for table `personaltutor`
--
ALTER TABLE `personaltutor`
  ADD CONSTRAINT `fk_s_personaltutor` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `kf_c_personaltutor` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `routinemodules`
--
ALTER TABLE `routinemodules`
  ADD CONSTRAINT `fk_m_routinemoudles` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`),
  ADD CONSTRAINT `fk_r_routinemodules` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`routine_id`);

--
-- Constraints for table `routines`
--
ALTER TABLE `routines`
  ADD CONSTRAINT `fk_c_routines` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `fk_c_staff` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `fk_m_staff` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`);

--
-- Constraints for table `staffdiaries`
--
ALTER TABLE `staffdiaries`
  ADD CONSTRAINT `fk_s_staffDiaries` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_c_students` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `fk_a_submissions` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`),
  ADD CONSTRAINT `fk_s_submissions` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
