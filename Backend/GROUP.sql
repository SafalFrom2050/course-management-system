-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2021 at 04:17 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

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
  `semester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignment_id`, `module_id`, `title`, `deadline`, `content`, `semester`) VALUES
(3, 2006, 'Swing GUI Vehicle rental', '2021-03-21 23:59:59', 'Go to this link google.com', 4);

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
(7, 2004, '2020-03-02 09:13:46', 4, 0, 2, 'Lecture'),
(8, 2002, '2020-03-02 07:00:46', 4, 0, 2, 'Lecture'),
(9, 2005, '2020-03-02 07:00:46', 4, 0, 2, 'Lecture'),
(15, 2004, '2021-03-07 10:19:00', 4, 0, 3, 'Lecture');

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
(8, 1, 1, '2021-03-01 21:03:42'),
(9, 5, 1, '2021-03-01 21:03:45'),
(11, 8, 1, '2021-03-01 21:03:54'),
(12, 9, 1, '2021-03-01 21:03:57'),
(19, 8, 2, '2021-03-23 12:50:43'),
(22, 15, 1, '2021-03-07 09:19:39');

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
(1, 1, 'My first diary', 'Node.js is an open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user\'s web browser. Consequently, Node.js represents a \"JavaScript everywhere\" paradigm,[6] unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.\r\n\r\nThough .js is the standard filename extension for JavaScript code, the name \"Node.js\" doesn\'t refer to a particular file in this context and is merely the name of the product. Node.js has an event-driven architecture capable of asynchronous I/O. These design choices aim to optimize throughput and scalability in web applications with many input/output operations, as well as for real-time Web applications (e.g., real-time communication programs and browser games).[7]\r\n\r\nThe Node.js distributed development project was previously governed by the Node.js Foundation,[8] and has now merged with the JS Foundation to form the OpenJS Foundation, which is facilitated by the Linux Foundation\'s Collaborative Projects program.[9]', '2020-12-19 00:00:00'),
(2, 1, 'Second Diary', 'This is a built-in middleware function in Express. It parses incoming request payloads into a Buffer and is based on body-parser.\r\n\r\nReturns middleware that parses all bodies as a Buffer and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.\r\n\r\nA new body Buffer containing the parsed data is populated on the request object after the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.\r\n\r\nAs req.body’s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, req.body.toString() may fail in multiple ways, for example stacking multiple parsers req.body may be from a different parser. Testing that req.body is a Buffer before calling buffer methods is recommended.\r\n\r\nThe following table describes the properties of the optional options object.', '2020-12-18 00:00:00'),
(3, 1, 'Third diary', 'The only method you must define in a React.Component subclass is called render(). All the other methods described on this page are optional.\r\n\r\nWe strongly recommend against creating your own base component classes. In React components, code reuse is primarily achieved through composition rather than inheritance.\r\n\r\nNote:\r\n\r\nReact doesn’t force you to use the ES6 class syntax. If you prefer to avoid it, you may use the create-react-class module or a similar custom abstraction instead. Take a look at Using React without ES6 to learn more.\r\n\r\nThe Component Lifecycle\r\nEach component has several “lifecycle methods” that you can override to run code at particular times in the process. You can use this lifecycle diagram as a cheat sheet. In the list below, commonly used lifecycle methods are marked as bold. The rest of them exist for relatively rare use cases.\r\n\r\nMounting\r\nThese methods are called in the following order when an instance of a component is being created and inserted into the DOM:\r\n\r\nconstructor()\r\nstatic getDerivedStateFromProps()\r\nrender()\r\ncomponentDidMount()\r\nNote:\r\n\r\nThese methods are considered legacy and you should avoid them in new code:\r\n\r\nUNSAFE_componentWillMount()\r\nUpdating\r\nAn update can be caused by changes to props or state. These methods are called in the following order when a component is being re-rendered:\r\n\r\nstatic getDerivedStateFromProps()\r\nshouldComponentUpdate()\r\nrender()\r\ngetSnapshotBeforeUpdate()\r\ncomponentDidUpdate()', '2020-12-17 00:00:00'),
(10, 1, 'Hello', 'Body', '2021-03-12 18:24:44'),
(11, 1, 'Ello', 'ELO ELO', '2021-03-12 18:26:30');

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
(5, 2, 2005, '09:00:00', '11:00:00'),
(6, 3, 2004, '11:00:00', '13:00:00');

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
(2, 'Michael', 'Jackson', 'prajita@email.com', 'Jorpati', '2020-02-03 00:00:00', 101, 2005, 23223, 'Database Technology Tutor', '$2b$12$H8HJPnpYfax4xnHwKc.Z.udy/ZpqqNxo3lLrj0NNL1AbXhgbTIMta\"'),
(4, 'Helen ', 'W Bluhm', 'WBluhm@gmail.com', '3932  Kenwood Place', '2017-02-21 00:00:00', 101, 2004, 5000, 'Software Engineering Teacher', '$2b$12$eYxG5WR9NYoXDecUC18OC.VW3jJ53urlwPZU2H6hjrJiH1b35mC1m'),
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
(1, 4, 'Teest', 'Testing', '2021-03-12 16:43:40'),
(2, 4, 'Supp', 'Supp supp', '2021-03-12 18:28:08'),
(3, 4, 'Ello', 'TEst', '2021-03-12 18:28:25');

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
(1, 101, 'Kushal', 'kupreti@email.com', '$2b$10$G2mR97nXqVTw6E3/kbJ6g./3VBgzJ.N0i5Luu/MiH4QUuuj3Jt0yu', 'Upreti', 'Jorpati', '+977-3342342555', 'F', '2000-02-14', '2019-03-21', 'Live'),
(2, 101, 'Safal', 'safal.sharma2woodland.edu.uk', '$2b$10$3EX.onBV7yGFndZRIww4dOotyDMPddBWa97w2SpZLzlW3TdsRbN02', 'Sharma', 'Jorpati', '+977-3342342555', 'F', '2000-02-14', '2020-03-21', 'Live');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `submission_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `assignment_id` int(10) NOT NULL,
  `submission_date` datetime NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`submission_id`, `student_id`, `assignment_id`, `submission_date`, `content`) VALUES
(2, 1, 3, '2021-02-24 23:13:43', 'Assignment https://www.apple.com/watch?v=dyRsYk0LyA8&ab_channel=BY');

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
  ADD KEY `module_id` (`module_id`);

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
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`module_id`),
  ADD KEY `course_id` (`course_id`);

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
  ADD KEY `student_id` (`student_id`),
  ADD KEY `assignment_id` (`assignment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attendancemodules`
--
ALTER TABLE `attendancemodules`
  MODIFY `attendance_modules_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `attendance_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `diaries`
--
ALTER TABLE `diaries`
  MODIFY `diary_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `diary_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `submission_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `fk_m_attendance_modules` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`);

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
