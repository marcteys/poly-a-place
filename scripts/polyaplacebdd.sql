-- phpMyAdmin SQL Dump
-- version 3.5.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2013 at 08:52 AM
-- Server version: 5.5.29-log
-- PHP Version: 5.3.21

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `marcteysmysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `polyaplacebdd`
--

CREATE TABLE IF NOT EXISTS `polyaplacebdd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(155) NOT NULL,
  `terrainName` varchar(155) NOT NULL,
  `randUrl` varchar(155) NOT NULL,
  `dateCrea` varchar(155) NOT NULL,
  `dateEdit` varchar(155) NOT NULL,
  `terrainData` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `polyaplacebdd`
--

INSERT INTO `polyaplacebdd` (`id`, `user`, `terrainName`, `randUrl`, `dateCrea`, `dateEdit`, `terrainData`) VALUES
(1, 'sdgsdgh', 'sgh', 'Pknfc', '2013-09-16', '2013-09-16', '1,1,2,2,2,0,0,0,0,0,0,0,0,0,0,1,2,2,1,0,2,0,0,0,0,0,0,0,0,0,2,2,2,1,1,0,2,0,0,0,0,0,0,0,0,1,1,2,1,1,1,2,0,0,0,0,0,0,0,0,0,0,2,2,1,2,1,0,0,0,0,0,0,0,0,0,0,0,2,2,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
