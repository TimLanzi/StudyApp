-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: StudyAppDB
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `userID` varchar(20) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flashcard_sets`
--

DROP TABLE IF EXISTS `flashcard_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flashcard_sets` (
  `username` varchar(20) DEFAULT NULL,
  `setname` varchar(30) NOT NULL,
  PRIMARY KEY (`setname`),
  KEY `username` (`username`),
  CONSTRAINT `flashcard_sets_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcard_sets`
--

LOCK TABLES `flashcard_sets` WRITE;
/*!40000 ALTER TABLE `flashcard_sets` DISABLE KEYS */;
INSERT INTO `flashcard_sets` VALUES ('15Qs','First Set\n'),('ikem14','Chemistry'),('ikem14','English'),('ikem14','Math'),('Sassy450','Enhlisb\n'),('Test','This is for our presentation!'),('trlanzi','Derivatives'),('trlanzi','Limits');
/*!40000 ALTER TABLE `flashcard_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flashcards`
--

DROP TABLE IF EXISTS `flashcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flashcards` (
  `username` varchar(20) NOT NULL,
  `setname` varchar(30) NOT NULL,
  `front_text` varchar(300) DEFAULT NULL,
  `back_text` varchar(300) DEFAULT NULL,
  KEY `username` (`username`),
  KEY `setname` (`setname`),
  CONSTRAINT `flashcards_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `flashcards_ibfk_2` FOREIGN KEY (`setname`) REFERENCES `flashcard_sets` (`setname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcards`
--

LOCK TABLES `flashcards` WRITE;
/*!40000 ALTER TABLE `flashcards` DISABLE KEYS */;
/*!40000 ALTER TABLE `flashcards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problems`
--

DROP TABLE IF EXISTS `problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problems` (
  `problem_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(300) DEFAULT NULL,
  `solution` varchar(150) DEFAULT NULL,
  `algebra` int(11) DEFAULT NULL,
  `arithmetic` int(11) DEFAULT NULL,
  `calculus` int(11) DEFAULT NULL,
  `functions` int(11) DEFAULT NULL,
  `geometry` int(11) DEFAULT NULL,
  `logarithm` int(11) DEFAULT NULL,
  `precalc` int(11) DEFAULT NULL,
  `trigonometry` int(11) DEFAULT NULL,
  `word_problem` int(11) DEFAULT NULL,
  PRIMARY KEY (`problem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problems`
--

LOCK TABLES `problems` WRITE;
/*!40000 ALTER TABLE `problems` DISABLE KEYS */;
INSERT INTO `problems` VALUES (1,'You want to use 100 meters of fence to enclose a rectangle that will adjoin an existing wall. (You only need fence on 3 sides.) The length of the side of the rectangular region that is parallel to the existing wall is $L$. Find the area of the region in terms of L.','A = 50 L - frac{1}{2}L^2',2,1,0,0,4,0,0,0,8),(2,'Suppose $f(x) = \\frac{1}{x}$. Let $g$ be the function whose graph is the graph of $f$  shifted 3 units to the left. Write the equation for $g$.  ','g(x) = \\frac{1}{x+3}',0,0,0,7,0,0,0,0,0),(3,'Write $log_{10} x$ entirely in terms of the natural logarithm.  ',' log_{10}x = \\frac{ln x}{ln 10} \n',0,0,0,0,0,9,0,0,0),(4,'Write $log_{3} x$ entirely in terms of the natural logarithm.  ','log_{3}x = \\frac{ln x}{ln 3} \n',0,0,0,0,0,9,0,0,0),(5,'Use the definition of the derivative to find $\\frac{dy}{dx}$ when $y = -x^2$.  ',' \\frac{dy}{dx} = \\lim_{\\Delta x \\to 0}\\frac{-(x+\\Delta x)^2+x^2}{\\Delta x} = -2 x \n',4,3,0,0,0,0,8,0,0),(6,'Let $f(x)=x^2$ and $g(x) = e^x$. Write the equation $g \\circ f$.  ',' g \\circ f = e^{x^2} \n',0,0,0,8,0,0,0,0,0),(7,'Evaluate $\\lim_{x \\to 0} - \\frac{1}{x}$  ',' \\lim_{x \\to 0} - \\frac{1}{x} = UNDEFINED \n',0,0,0,0,0,0,9,0,0),(8,'Evaluate $\\lim_{x \\to 0}  \\frac{1}{x^2}$  ',' \\lim_{x \\to 0} - \\frac{1}{x} = \\infty \n',0,0,0,0,0,0,8,0,0),(9,'Evaluate $\\lim_{x \\to \\infty} \\frac{3 x^3-14x^2+5}{1-2x^2}$  ',' \\lim_{x \\to \\infty} \\frac{3 x^3-14x^2+5}{1-2x^2} = \\frac{3}{2} \n',4,2,0,0,0,0,7,0,0),(10,'Find all values of x that satisfy the equation: $10^{-2x}=5$  ','  x = -\\frac{log 5}{2} = -0.3495 \n',0,0,0,0,0,8,0,0,0),(11,'Simplify $sin x - sin x cos^2 x$  ',' sin x ( 1-cos^2x) = sin x sin^2 x = sin^3 x \n',2,0,0,0,0,0,0,8,0),(12,'Find the perimeter of the square that can be inscribed in a circle of radius $\\sqrt{2}$.  ',' Perimeter = 8 \n',2,1,0,0,6,0,0,0,4),(13,'Find the fourth term in the sequence whose first three terms are 1, 8, and 27.  ',' 64 \n',0,3,0,2,0,0,2,0,6),(14,'The circumference of a circle equals the circumference of a square. Which has the greater area,  the circle of the square?  ',' Circle \n',0,0,0,0,7,0,0,0,6),(15,'Solve for $x$, $(0 < x < 2 \\pi)$.  $sin(3x) = \\frac{1}{2}$  ',' x = \\frac{7 \\pi}{18}, \\frac{11 \\pi}{18}, \\frac{19 \\pi}{18}, \\frac{23 \\pi}{18},  \\frac{31 \\pi}{18}, \\frac{35 \\pi}{18}  \n',0,2,0,2,0,0,0,6,0),(16,'Write the equation of a function whose graph is identical to the  graph of $y = \\frac{1}{x}$ except that it is shifted left 2 units and up 3 units.  ',' y = \\frac{1}{x+2} + 3 \n',0,0,0,5,0,0,0,0,4),(17,'Write an expression for the exact value of $x$ such that $4^x = 17$  ',' x = \\frac{ln 17}{ln 4} \\qquad or \\qquad \\frac{log 17 }{log 4} \\qquad or \\qquad log_4 17  \n',4,0,0,0,0,6,0,0,0),(18,'Use the definition of the derivative to determine $\\frac{d}{dx}f(x)$, where $f(x) = -4x+5$  ',' \\frac{d}{dx}f(x) = -4 \n',0,0,0,2,0,0,7,0,0),(19,'Use the definition of the derivative to determine $D_x y$, where $y = x^3$  ',' D_x y = 3 x^2 \n',0,0,0,2,0,0,8,0,0),(20,'Let $f(x) = sin x$. Find the domain and range of f  ',' Domain  f : \\mathbb{R} , \\qquad Range f : \\left\\lbrace y \\in \\mathbb{R} | -1 \\leq y \\leq 1 \\right\\rbrace \n',0,0,0,6,0,0,0,5,0),(21,'Let $g(x) = x^2$. Find the domain and range of g  ','  Domain  g : \\mathbb{R} , \\qquad Range g : \\left\\lbrace y \\in \\mathbb{R} |  y \\geq 0 \\right\\rbrace \n',0,0,0,6,0,0,0,0,0),(22,'Evaluate $$\\lim_{x \\to \\infty}  \\frac{x^2-3x^3+14}{4x^3-7x^2-5}$$  ',' -\\frac{3}{4} \n',4,2,0,0,0,0,7,0,0),(23,'Evaluate $$\\lim_{x \\to 1}  \\frac{x^2+x-2}{x^2-1}$$  ',' \\frac{3}{2} \n',4,2,0,0,0,0,7,0,0),(24,'Evaluate $$\\lim_{x \\to \\infty}  \\frac{x^2+6x-4}{x^3+4x^2-1}$$  ',' 0 \n',4,2,0,0,0,0,7,0,0),(25,'On which interval(s) is the function $y = x^2+x-2$ increasing?  ',' -\\frac{1}{2} < x < \\infty   \n',4,2,0,7,0,0,0,0,0),(26,'Find the length of a side of the equilateral triangle that can be inscribed in a circle of radius 4.  ',' L = 4 \\sqrt{3} \n',2,2,0,0,6,0,0,5,3),(27,'The volume of an explosion increases exponentially. One minute after the  explosion, the volume was 10 cubic kilometers. Three minutes after the explosion, the volume was 30 cubic kilometers. How many minutes after the explosion will it  take for the volume to expand to 60 cubic kilometers?  ',' t = \\frac{ln 6\\sqrt{3}}{ln \\sqrt{3}} \\approx 4.2619 minutes \n',5,4,0,0,7,3,0,0,4),(28,'Find $y\'$ where $y=x^3e^x$  ',' y\' = x^2 e^x (x+3) \n',4,0,7,0,0,0,0,0,0),(29,'Find $\\frac{dy}{dx}$ where $y = -3t cos t$  ',' \\frac{dy}{dt} = 3(t sin t - cos t) \n',0,0,8,0,0,0,0,6,0),(30,'Evaluate $f\'(-2)$ for $f(x) = x^2 ln|x|$  ',' f\'(x) = x+2xln|x|, f\'(-2) = -2 - ln16 \\approx -4.7726 \n',5,3,8,0,0,4,0,0,0),(31,'find $ds$ where $s = 2x^2y$  ',' ds = 2 x^2 dy + 4 x y dx \n',4,0,7,0,0,0,0,0,0),(32,'Find the equation of the line tangent to the graph of $y = \\sqrt[3]{x^2}$ at $x = 8$  ',' y = \\frac{1}{3} x + \\frac{4}{3} \n',0,0,6,5,0,0,0,0,3),(33,'Solve $2 ln x - ln \\left( x + \\frac{1}{2} \\right) = ln 2$ for $x$  ',' x  = 1 + \\sqrt{2} \\approx 2.4142 \n',4,3,0,0,0,6,0,0,0),(34,'Evaluate $$\\lim_{x \\to -2} \\frac{2 x^2+3x-2}{x^2+4}$$  ',' 0 \n',3,2,0,0,0,0,6,0,0),(35,'Find all the real roots of the function $y = x^3 - x^2 + 2x - 2$  ',' x=1 \n',6,4,0,7,0,0,0,0,0),(36,'Simplify $$ a + \\frac{1}{a + \\frac{1}{a}}$$  ',' = \\frac{a^3+2a}{a^2+1} \n',8,0,0,0,0,0,0,0,0),(37,'Simplify $$\\frac{1}{a + \\frac{1}{x+\\frac{1}{m}}}$$  ',' = \\frac{m x+1}{a m x + a + m} \n',9,0,0,0,0,0,0,0,0),(38,'Simplify $$\\frac{x^2 y}{1 + m^2} + \\frac{x}{y}$$  ',' = \\frac{x^2y^2+x+m^2x}{y+m^2y} \n',7,0,0,0,0,0,0,0,0),(39,'Simplify $$\\frac{4 - 3\\sqrt{2}}{8 - \\sqrt{2}}$$  ',' = \\frac{13 - 10 \\sqrt{2}}{31} \n',6,2,0,0,0,0,0,0,0),(40,'Simplify $$\\frac{x^a y^{a+b}}{x^{-a/2} y^{b-1}}$$  ',' = x^{3a/2}y^{a+1} \n',7,4,0,0,0,0,0,0,0),(41,'Simplify $$\\frac{m^{x+2}b^{x-2}}{m^{2x/3}b^{-3x/2}}$$  ',' = m^{x/3+2} b^{5x/2-1} \n',6,3,0,0,0,0,0,0,0),(42,'Simplify $$\\sqrt{x y} x^{2/3} y^{-3/2}$$  ',' =x^{7/6} y^{-1} \n',6,2,0,0,0,0,0,0,0),(43,'Solve: $$ \\begin{array}{c}  2x + 3y = -4 \\\\ x - 2z = -3 \\\\ 2y - z = -6 \\\\ \\end{array}$$  ',' \\begin{array}{c} x = 1 \\\\ y = -2 \\\\ z = 2 \\\\ \\end{array} \n',8,0,0,0,0,0,0,0,0),(44,'Factor: $a^2 x - a^2 - 4 b^2 x + 4 b^2$  ',' =(a-2b)(a+2b)(x-1) \n',8,0,0,0,0,0,0,0,0),(45,'Factor: $16 a^{4m+3} - 8a^{2m+3}$  ',' = 8 a^{2m+3}(2a^{2m}-1) \n',7,3,0,0,0,0,0,0,0),(46,'Factor: $a^2 b^{2x+2} - a b ^{2x+1}$  ',' = a b^{2x+1}(ab-1)\n',6,2,0,0,0,0,0,0,0),(47,'Factor: $9x^2-y^4$  ',' = (3x+y^2)(3x-y^2)\n',6,2,0,0,0,0,0,0,0),(48,'Factor: $a^6-27b^3c^3$  ','= (a^2-3bc)(a^4+3a^2bc+9b^2c^2) \n',8,0,0,0,0,0,0,0,0),(49,'Factor: $x^3y^6 + 8m^{12}$  ',' = (xy^2+2m^4)(x^2y^4-2m^4xy^2 +4m^8)\n',8,0,0,0,0,0,0,0,0),(50,'Simplify: $$\\frac{12!}{8!4!}$$  ','=495\n',6,3,0,2,0,0,0,0,0),(51,'Simplify: $$\\frac{n (n!)}{(n+1)!}$$  ','=\\frac{n}{n+1} \n',7,0,0,4,0,0,0,0,0),(52,'Simplify: $$\\sum_{i=1}^{3} 4$$  ','=12\n',0,3,0,5,0,0,0,0,0),(53,'Simplify: $$ \\sum_{m=0}^{3} \\frac{3^m}{m+1}$$  ','=\\frac{49}{4}\n',0,4,0,5,0,0,0,0,0),(54,'Find the surface area of a sphere whose volume is $\\frac{4}{3}\\pi$ cubic meters.  ','=4\\pi \\quad \\mathbf{meters}^2\n',0,2,0,0,6,0,0,0,0),(55,'Solve: $x^2-3x-4=0$  ','x = 4,-1\n',3,2,0,5,0,0,0,0,0),(56,'Solve: $3x^2-x-7=0$  ','x = \\frac{1}{6} \\pm \\frac{\\sqrt{85}}{6}\n',4,2,0,6,0,0,0,0,0),(57,'Divide: $2x^3-3x+5$ by $x-3$  ','=2x^2+6x+15+\\frac{50}{x-3}\n',5,2,0,7,0,0,0,0,0),(58,'Evaluate: $\\cos^2\\frac{\\pi}{3}-\\cot\\frac{\\pi}{4}+\\sin\\frac{\\pi}{6}$  ','= -\\frac{1}{4} \n',0,3,0,0,0,0,0,6,0),(59,'Evaluate: $\\sec 60^\\circ + \\csc^2\\frac{\\pi}{3}$  ',' =\\frac{10}{3}\n',0,3,0,0,0,0,0,6,0),(60,'Evaluate: $3 \\cos\\frac{17 \\pi}{6} + 2 \\cos \\left(-\\frac{5 \\pi}{3} \\right)$  ',' = -\\frac{3\\sqrt{3}}{2} + 1\n',0,3,0,0,0,0,0,6,0),(61,'Evaluate: $4 \\tan \\left(-\\frac{3 \\pi}{4}\\right) + \\sin \\left(-\\frac{\\pi}{4} \\right)$  ',' = 4 - \\frac{\\sqrt{2}}{2} \n',0,3,0,0,0,0,0,6,0),(62,'Simplify: $\\sin^2 \\theta \\csc \\theta \\cot \\theta$  ','=\\cos \\theta\n',2,0,0,0,0,0,0,7,0),(63,'Simplify: $\\frac{\\tan \\theta \\sin \\theta}{\\sec \\theta}$  ','=\\sin^2 \\theta\n',3,0,0,0,0,0,0,7,0),(64,'Find the surface area of the rectangular solid whose height is $h$, whose width is $w$ and whose length is $l$.  ','Area = 2(h w + h l + l w)\n',6,0,0,0,6,0,0,0,5),(65,'The cost of a building varies linearly with the number of floors the building has.  If a 10-story building costs \\$12 million and a 4-story building costs \\$6 million, how much does a 7-story building cost?  ',' \\$9 \\quad million\n',6,2,0,4,0,0,0,0,7),(66,'Simplify: $$\\frac{x^3-a^3}{x-a}$$  ','=x^2+ax+a^2\n',6,3,0,4,0,0,0,0,7),(67,'Evaluate: $\\sin^2\\frac{\\pi}{7} + \\cos^2\\frac{\\pi}{7}$  ','=1\n',6,4,0,0,0,0,0,0,0),(68,'If $\\sin\\theta = -4/5$, evaluate $\\sin(-\\theta)$.  ','= 4/5\n',0,3,0,0,0,0,0,7,0),(69,'If $\\sin\\theta = -4/5$, evaluate $\\cos(\\pi/2-\\theta)$.  ','= -4/5\n',0,3,0,0,0,0,0,7,0);
/*!40000 ALTER TABLE `problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_problem_results`
--

DROP TABLE IF EXISTS `user_problem_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_problem_results` (
  `username` varchar(20) NOT NULL,
  `problem_id` int(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `problem_grade` float DEFAULT NULL,
  PRIMARY KEY (`username`,`problem_id`,`date_time`),
  CONSTRAINT `user_problem_results_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_problem_results`
--

LOCK TABLES `user_problem_results` WRITE;
/*!40000 ALTER TABLE `user_problem_results` DISABLE KEYS */;
INSERT INTO `user_problem_results` VALUES ('15Qs',1,'2018-12-16 22:21:54',5),('15Qs',1,'2018-12-16 23:08:09',1),('15Qs',2,'2018-12-16 23:06:59',3),('15Qs',2,'2018-12-16 23:08:09',1),('15Qs',3,'2018-12-16 23:05:07',3),('15Qs',3,'2018-12-16 23:06:55',3),('15Qs',3,'2018-12-16 23:08:17',1),('15Qs',3,'2018-12-16 23:14:20',1),('15Qs',3,'2018-12-17 17:24:51',3),('15Qs',5,'2018-12-16 23:06:46',3),('15Qs',5,'2018-12-16 23:10:19',1),('15Qs',5,'2018-12-16 23:14:47',2),('15Qs',6,'2018-12-16 23:05:19',3),('15Qs',6,'2018-12-16 23:08:22',1),('15Qs',7,'2018-12-16 22:31:47',3),('15Qs',8,'2018-12-16 22:21:45',5),('15Qs',8,'2018-12-16 23:05:23',3),('15Qs',9,'2018-12-16 23:05:10',3),('15Qs',9,'2018-12-16 23:07:03',3),('15Qs',11,'2018-12-16 22:22:00',5),('15Qs',11,'2018-12-16 23:14:15',1),('15Qs',12,'2018-12-16 23:10:13',1),('15Qs',14,'2018-12-16 23:08:20',1),('15Qs',14,'2018-12-16 23:10:14',1),('15Qs',14,'2018-12-16 23:11:20',1),('15Qs',15,'2018-12-16 23:08:05',1),('15Qs',15,'2018-12-16 23:11:17',1),('15Qs',15,'2018-12-16 23:14:06',1),('15Qs',16,'2018-12-16 22:22:05',5),('15Qs',16,'2018-12-16 22:31:52',3),('15Qs',17,'2018-12-16 22:21:56',5),('15Qs',17,'2018-12-16 23:10:09',1),('15Qs',18,'2018-12-16 23:06:52',3),('15Qs',18,'2018-12-16 23:08:15',1),('15Qs',19,'2018-12-16 22:31:27',3),('15Qs',19,'2018-12-16 23:08:12',1),('15Qs',20,'2018-12-16 23:05:13',3),('15Qs',21,'2018-12-16 23:06:35',1),('15Qs',22,'2018-12-16 23:05:18',3),('15Qs',22,'2018-12-16 23:06:35',1),('15Qs',22,'2018-12-16 23:10:05',1),('15Qs',23,'2018-12-16 22:31:54',3),('15Qs',23,'2018-12-16 23:11:12',1),('15Qs',24,'2018-12-16 22:22:02',5),('15Qs',24,'2018-12-16 22:31:33',3),('15Qs',24,'2018-12-16 23:05:16',3),('15Qs',25,'2018-12-16 22:30:46',3),('15Qs',25,'2018-12-16 23:05:24',3),('15Qs',26,'2018-12-16 23:06:50',3),('15Qs',26,'2018-12-16 23:10:07',1),('15Qs',27,'2018-12-16 23:11:10',1),('15Qs',28,'2018-12-16 22:31:30',3),('15Qs',28,'2018-12-16 23:05:21',3),('15Qs',28,'2018-12-16 23:11:14',1),('15Qs',28,'2018-12-16 23:14:19',1),('15Qs',29,'2018-12-16 23:14:54',2),('15Qs',30,'2018-12-16 23:10:12',1),('15Qs',30,'2018-12-16 23:11:07',1),('15Qs',30,'2018-12-16 23:14:49',2),('15Qs',31,'2018-12-16 23:06:53',3),('15Qs',31,'2018-12-16 23:14:18',1),('15Qs',31,'2018-12-16 23:14:48',2),('15Qs',32,'2018-12-16 22:21:52',5),('15Qs',32,'2018-12-16 22:31:22',3),('15Qs',32,'2018-12-16 23:10:16',1),('15Qs',34,'2018-12-16 23:08:05',1),('15Qs',35,'2018-12-16 23:11:13',1),('15Qs',36,'2018-12-16 23:14:05',1),('15Qs',36,'2018-12-16 23:14:41',2),('15Qs',37,'2018-12-16 22:31:57',3),('15Qs',37,'2018-12-16 23:05:20',3),('15Qs',37,'2018-12-16 23:08:05',1),('15Qs',37,'2018-12-17 17:24:47',3),('15Qs',38,'2018-12-16 23:14:43',2),('15Qs',39,'2018-12-16 23:06:56',3),('15Qs',40,'2018-12-16 22:31:37',3),('15Qs',41,'2018-12-16 23:14:45',2),('15Qs',42,'2018-12-16 23:10:20',1),('15Qs',42,'2018-12-16 23:14:39',2),('15Qs',42,'2018-12-17 17:25:05',4),('15Qs',43,'2018-12-16 22:31:35',3),('15Qs',44,'2018-12-16 23:05:08',3),('15Qs',44,'2018-12-16 23:14:09',1),('15Qs',45,'2018-12-16 23:11:08',1),('15Qs',45,'2018-12-16 23:14:17',1),('15Qs',46,'2018-12-16 23:14:48',2),('15Qs',47,'2018-12-16 22:21:42',5),('15Qs',47,'2018-12-16 23:08:16',1),('15Qs',47,'2018-12-16 23:10:18',1),('15Qs',48,'2018-12-16 22:21:44',5),('15Qs',48,'2018-12-16 23:06:31',3),('15Qs',48,'2018-12-16 23:11:18',1),('15Qs',49,'2018-12-16 23:14:47',2),('15Qs',50,'2018-12-16 22:30:44',3),('15Qs',50,'2018-12-16 23:05:12',3),('15Qs',50,'2018-12-16 23:14:52',2),('15Qs',51,'2018-12-16 22:21:47',5),('15Qs',51,'2018-12-16 23:08:14',1),('15Qs',51,'2018-12-16 23:10:17',1),('15Qs',52,'2018-12-16 23:14:10',1),('15Qs',53,'2018-12-16 22:30:48',3),('15Qs',53,'2018-12-16 22:31:24',3),('15Qs',53,'2018-12-16 23:08:17',1),('15Qs',54,'2018-12-16 23:08:06',1),('15Qs',54,'2018-12-16 23:11:16',1),('15Qs',56,'2018-12-16 22:31:39',3),('15Qs',56,'2018-12-16 23:14:42',2),('15Qs',57,'2018-12-16 23:10:22',1),('15Qs',57,'2018-12-16 23:10:23',1),('15Qs',57,'2018-12-16 23:10:25',1),('15Qs',57,'2018-12-16 23:10:28',1),('15Qs',57,'2018-12-16 23:10:30',1),('15Qs',57,'2018-12-16 23:10:32',1),('15Qs',57,'2018-12-16 23:14:19',1),('15Qs',57,'2018-12-17 17:24:49',3),('15Qs',58,'2018-12-16 23:11:15',1),('15Qs',59,'2018-12-16 22:30:42',2),('15Qs',59,'2018-12-16 23:06:34',1),('15Qs',59,'2018-12-16 23:08:23',1),('15Qs',60,'2018-12-16 23:10:14',1),('15Qs',61,'2018-12-16 22:21:59',5),('15Qs',61,'2018-12-16 23:11:19',1),('15Qs',62,'2018-12-16 22:31:44',3),('15Qs',62,'2018-12-16 23:06:48',3),('15Qs',63,'2018-12-16 23:11:22',1),('15Qs',63,'2018-12-16 23:14:08',1),('15Qs',63,'2018-12-16 23:14:44',2),('15Qs',64,'2018-12-16 22:31:42',3),('15Qs',64,'2018-12-16 23:05:13',3),('15Qs',64,'2018-12-16 23:14:20',1),('15Qs',64,'2018-12-16 23:14:23',2),('15Qs',64,'2018-12-16 23:14:25',2),('15Qs',64,'2018-12-16 23:14:27',2),('15Qs',64,'2018-12-16 23:14:36',2),('15Qs',65,'2018-12-16 22:22:04',5),('15Qs',65,'2018-12-16 23:14:11',1),('15Qs',65,'2018-12-16 23:14:49',2),('15Qs',66,'2018-12-16 23:10:11',1),('15Qs',67,'2018-12-16 23:05:14',3),('15Qs',68,'2018-12-16 22:21:49',5),('15Qs',68,'2018-12-16 23:06:32',3),('15Qs',68,'2018-12-16 23:11:11',1),('15Qs',68,'2018-12-16 23:14:14',1),('15Qs',68,'2018-12-16 23:14:46',2),('15Qs',69,'2018-12-16 22:21:51',5),('15Qs',69,'2018-12-16 23:06:32',3),('15Qs',69,'2018-12-16 23:14:16',1),('asdf',2,'2018-12-16 23:15:46',1),('asdf',4,'2018-12-16 23:15:40',1),('asdf',10,'2018-12-16 23:15:53',1),('asdf',13,'2018-12-16 23:15:39',1),('asdf',29,'2018-12-16 23:16:02',1),('asdf',33,'2018-12-16 23:15:48',1),('asdf',37,'2018-12-16 23:15:51',1),('asdf',42,'2018-12-16 23:15:47',1),('asdf',43,'2018-12-16 23:15:40',1),('asdf',45,'2018-12-16 23:16:03',1),('asdf',47,'2018-12-16 23:15:50',1),('asdf',56,'2018-12-16 23:15:49',1),('asdf',59,'2018-12-16 23:15:43',1),('asdf',62,'2018-12-16 23:15:45',2),('asdf',68,'2018-12-16 23:16:00',1),('DayB4',7,'2018-12-16 22:19:55',4),('DayB4',8,'2018-12-16 22:20:25',5),('DayB4',11,'2018-12-16 22:20:01',4),('DayB4',13,'2018-12-16 22:20:30',5),('DayB4',16,'2018-12-16 22:20:27',5),('DayB4',23,'2018-12-16 22:20:28',5),('DayB4',30,'2018-12-16 22:19:51',4),('DayB4',34,'2018-12-16 22:19:59',4),('DayB4',36,'2018-12-16 22:20:32',5),('DayB4',39,'2018-12-16 22:20:03',4),('DayB4',40,'2018-12-16 22:19:52',4),('DayB4',44,'2018-12-16 22:19:46',4),('DayB4',47,'2018-12-16 22:19:56',4),('DayB4',49,'2018-12-16 22:19:43',4),('DayB4',55,'2018-12-16 22:19:49',4),('DayB4',57,'2018-12-16 22:19:50',4),('DayB4',63,'2018-12-16 22:19:54',4),('DayB4',63,'2018-12-16 22:20:33',5),('DayB4',67,'2018-12-16 22:19:44',4),('DayB4',69,'2018-12-16 22:19:47',4),('rlanzi',10,'2018-11-30 03:18:56',4),('rlanzi',10,'2018-11-30 03:18:59',4),('rlanzi',11,'2018-11-11 00:17:07',5),('rlanzi',11,'2018-11-30 03:18:49',5),('rlanzi',12,'2018-11-30 03:17:47',4),('rlanzi',13,'2018-11-30 03:18:09',5),('rlanzi',15,'2018-11-30 03:18:28',4),('rlanzi',17,'2018-11-11 00:18:22',5),('rlanzi',18,'2018-11-11 00:19:06',5),('rlanzi',20,'2018-11-30 03:18:39',4),('rlanzi',24,'2018-11-11 00:21:04',5),('rlanzi',38,'2018-11-11 00:17:20',4),('rlanzi',39,'2018-11-11 00:16:52',5),('rlanzi',42,'2018-11-30 03:18:46',4),('rlanzi',43,'2018-11-30 03:18:42',5),('rlanzi',46,'2018-11-11 00:20:46',5),('rlanzi',46,'2018-11-30 03:18:46',5),('rlanzi',48,'2018-11-30 03:17:56',4),('rlanzi',49,'2018-11-30 03:18:52',5),('rlanzi',53,'2018-11-30 03:19:00',5),('rlanzi',55,'2018-11-11 00:17:39',5),('rlanzi',59,'2018-11-11 00:17:14',5),('rlanzi',59,'2018-11-30 03:18:15',4),('rlanzi',61,'2018-11-30 03:18:58',5),('rlanzi',63,'2018-11-30 03:18:48',4),('rlanzi',64,'2018-11-11 00:17:56',5),('rlanzi',64,'2018-11-30 03:18:53',4),('rlanzi',66,'2018-11-30 03:18:52',4),('rlanzi',69,'2018-11-11 00:18:43',5),('Sassy450',8,'2018-12-17 18:41:49',3),('Sassy450',10,'2018-12-17 18:45:30',4),('Sassy450',11,'2018-12-17 18:42:12',4),('Sassy450',17,'2018-12-17 18:41:37',5),('Sassy450',21,'2018-12-17 18:41:33',4),('Sassy450',24,'2018-12-17 18:41:59',5),('Sassy450',29,'2018-12-17 18:41:14',2),('Sassy450',33,'2018-12-17 18:42:02',2),('Sassy450',40,'2018-12-17 18:41:22',3),('Sassy450',46,'2018-12-17 18:42:09',2),('Sassy450',48,'2018-12-17 18:42:06',3),('Sassy450',51,'2018-12-17 18:41:42',1),('Sassy450',58,'2018-12-17 18:41:53',4),('Sassy450',59,'2018-12-17 18:41:03',4),('Sassy450',64,'2018-12-17 18:41:07',3),('Sassy450',66,'2018-12-17 18:41:45',2),('Student2319',2,'2018-12-11 00:13:36',3),('Student2319',4,'2018-12-11 00:13:56',3),('Student2319',6,'2018-12-11 00:13:52',3),('Student2319',8,'2018-12-11 00:13:50',3),('Student2319',9,'2018-12-11 00:13:34',3),('Student2319',11,'2018-12-11 00:13:20',3),('Student2319',13,'2018-12-11 00:13:08',3),('Student2319',17,'2018-12-11 00:13:04',5),('Student2319',19,'2018-12-11 00:13:14',3),('Student2319',19,'2018-12-11 00:14:06',3),('Student2319',21,'2018-12-11 00:14:14',3),('Student2319',22,'2018-12-11 00:13:30',3),('Student2319',22,'2018-12-11 00:13:33',3),('Student2319',22,'2018-12-11 00:14:05',3),('Student2319',25,'2018-12-11 00:13:31',3),('Student2319',25,'2018-12-11 00:13:51',3),('Student2319',26,'2018-12-11 00:14:09',3),('Student2319',29,'2018-12-11 00:14:12',3),('Student2319',30,'2018-12-11 00:13:12',3),('Student2319',36,'2018-12-11 00:14:02',3),('Student2319',37,'2018-12-11 00:14:21',3),('Student2319',39,'2018-12-11 00:14:03',3),('Student2319',40,'2018-12-11 00:14:15',3),('Student2319',41,'2018-12-11 00:13:18',3),('Student2319',41,'2018-12-11 00:14:00',3),('Student2319',46,'2018-12-11 00:13:58',3),('Student2319',49,'2018-12-11 00:13:16',3),('Student2319',52,'2018-12-11 00:14:17',3),('Student2319',52,'2018-12-11 00:14:19',3),('Student2319',54,'2018-12-11 00:14:16',3),('Student2319',55,'2018-12-11 00:14:10',3),('Student2319',57,'2018-12-11 00:14:08',3),('Student2319',58,'2018-12-11 00:13:47',3),('Student2319',60,'2018-12-11 00:13:06',5),('Student2319',62,'2018-12-11 00:13:44',3),('Student2319',62,'2018-12-11 00:13:55',3),('Student2319',68,'2018-12-11 00:14:01',3),('Test',1,'2018-11-29 03:33:34',3),('Test',1,'2018-12-10 16:13:04',3),('Test',2,'2018-12-12 21:47:40',3),('Test',3,'2018-12-10 17:11:02',3),('Test',4,'2018-12-10 17:11:05',3),('Test',4,'2018-12-12 21:47:39',3),('Test',6,'2018-12-16 20:45:17',3),('Test',8,'2018-12-10 17:10:54',3),('Test',11,'2018-12-10 17:11:03',3),('Test',11,'2018-12-12 21:38:17',4),('Test',13,'2018-12-12 21:46:48',4),('Test',16,'2018-12-10 17:11:07',3),('Test',17,'2018-12-12 21:47:51',3),('Test',18,'2018-12-16 20:44:55',3),('Test',19,'2018-12-16 20:45:01',3),('Test',23,'2018-12-12 21:46:47',3),('Test',24,'2018-12-12 21:38:19',3),('Test',24,'2018-12-12 21:47:47',3),('Test',25,'2018-12-12 21:47:41',3),('Test',25,'2018-12-16 20:21:49',3),('Test',29,'2018-12-16 20:44:27',3),('Test',30,'2018-12-10 17:11:01',3),('Test',31,'2018-12-12 21:46:54',4),('Test',36,'2018-12-10 17:09:56',3),('Test',38,'2018-12-16 20:44:21',4),('Test',40,'2018-12-10 17:10:52',3),('Test',43,'2018-11-29 03:33:20',2),('Test',47,'2018-12-03 15:23:05',5),('Test',47,'2018-12-10 17:11:00',3),('Test',48,'2018-12-10 17:11:04',3),('Test',48,'2018-12-12 21:47:48',3),('Test',48,'2018-12-16 20:44:42',3),('Test',49,'2018-12-12 21:47:45',3),('Test',49,'2018-12-16 20:45:44',3),('Test',51,'2018-12-10 17:10:48',3),('Test',51,'2018-12-12 21:47:35',3),('Test',51,'2018-12-16 20:57:39',3),('Test',52,'2018-12-04 09:40:29',3),('Test',52,'2018-12-12 21:38:20',5),('Test',52,'2018-12-12 21:46:50',4),('Test',52,'2018-12-12 21:47:43',3),('Test',53,'2018-12-16 20:58:40',3),('Test',56,'2018-12-10 17:10:56',3),('Test',58,'2018-12-12 21:46:56',4),('Test',60,'2018-12-16 20:44:17',2),('Test',60,'2018-12-16 20:53:49',3),('Test',61,'2018-12-10 17:10:58',3),('Test',61,'2018-12-12 21:47:32',3),('Test',61,'2018-12-16 20:45:09',5),('Test',61,'2018-12-16 20:57:55',2),('Test',63,'2018-12-10 17:10:55',3),('Test',64,'2018-12-16 20:45:40',3),('Test',64,'2018-12-16 20:57:52',2),('Test',64,'2018-12-16 21:01:33',3),('Test',66,'2018-12-12 21:47:37',3),('Test',67,'2018-12-16 20:44:15',2),('Test',68,'2018-12-10 17:10:57',3),('Test',68,'2018-12-12 21:47:33',3),('Test',68,'2018-12-16 20:57:53',2),('Test',69,'2018-12-16 21:01:32',3),('trlanzi',2,'2018-11-11 19:25:18',1),('trlanzi',4,'2018-11-30 16:12:34',4),('trlanzi',4,'2018-12-16 17:55:51',5),('trlanzi',6,'2018-11-13 03:36:57',1),('trlanzi',8,'2018-11-13 23:17:15',4),('trlanzi',8,'2018-11-18 00:56:21',3),('trlanzi',9,'2018-11-11 19:20:47',5),('trlanzi',9,'2018-11-19 20:36:41',4),('trlanzi',16,'2018-11-13 01:43:33',5),('trlanzi',16,'2018-11-29 16:58:59',1),('trlanzi',16,'2018-12-11 00:06:28',3),('trlanzi',17,'2018-11-11 19:20:48',3),('trlanzi',17,'2018-11-30 16:12:30',3),('trlanzi',21,'2018-11-11 19:20:50',4),('trlanzi',21,'2018-11-12 20:47:32',2),('trlanzi',21,'2018-11-18 16:48:20',1),('trlanzi',23,'2018-11-13 01:43:30',5),('trlanzi',24,'2018-11-13 23:34:25',4),('trlanzi',25,'2018-11-13 01:43:26',5),('trlanzi',25,'2018-11-13 01:43:30',5),('trlanzi',25,'2018-11-29 16:59:01',2),('trlanzi',28,'2018-11-29 16:58:58',3),('trlanzi',29,'2018-11-29 16:58:56',4),('trlanzi',30,'2018-11-13 01:43:34',5),('trlanzi',34,'2018-11-19 20:06:22',1),('trlanzi',35,'2018-11-13 01:43:32',5),('trlanzi',35,'2018-11-18 00:56:22',5),('trlanzi',37,'2018-11-18 16:48:19',3),('trlanzi',37,'2018-11-19 20:06:19',1),('trlanzi',38,'2018-11-11 19:25:20',5),('trlanzi',38,'2018-11-13 01:43:36',5),('trlanzi',38,'2018-11-13 23:17:17',1),('trlanzi',45,'2018-11-19 20:06:21',1),('trlanzi',47,'2018-11-19 21:10:38',5),('trlanzi',48,'2018-11-11 19:25:22',3),('trlanzi',48,'2018-11-19 21:00:23',4),('trlanzi',49,'2018-11-11 19:20:49',1),('trlanzi',50,'2018-11-11 19:25:18',4),('trlanzi',50,'2018-11-13 01:43:24',5),('trlanzi',50,'2018-11-18 00:56:20',4),('trlanzi',59,'2018-11-11 19:20:47',2),('trlanzi',59,'2018-11-13 01:43:24',5),('trlanzi',59,'2018-11-18 16:48:17',5),('trlanzi',65,'2018-11-11 19:25:17',2),('trlanzi',66,'2018-11-13 01:43:27',5),('trlanzi2',1,'2018-11-18 01:33:07',2),('trlanzi2',3,'2018-11-18 01:33:08',1),('trlanzi2',7,'2018-11-18 01:33:06',3),('trlanzi2',14,'2018-11-18 01:32:31',2),('trlanzi2',16,'2018-11-18 01:32:33',2),('trlanzi2',21,'2018-11-18 01:33:18',1),('trlanzi2',22,'2018-11-18 01:32:29',3),('trlanzi2',24,'2018-11-18 01:32:29',1),('trlanzi2',24,'2018-11-18 01:33:11',2),('trlanzi2',47,'2018-11-18 01:32:33',2),('trlanzi2',48,'2018-11-18 01:33:18',3),('trlanzi2',51,'2018-11-18 01:33:04',5),('trlanzi2',56,'2018-11-18 01:32:32',2),('trlanzi2',60,'2018-11-18 01:33:11',1),('trlanzi2',62,'2018-11-18 01:33:05',3),('trlanzi3',1,'2018-11-25 05:57:01',2),('trlanzi3',3,'2018-11-26 16:14:41',4),('trlanzi3',4,'2018-11-26 15:59:43',2),('trlanzi3',4,'2018-11-26 16:14:38',5),('trlanzi3',9,'2018-11-26 16:14:43',2),('trlanzi3',16,'2018-11-26 16:14:40',3),('trlanzi3',23,'2018-11-26 16:14:31',3),('trlanzi3',24,'2018-11-26 16:14:34',4),('trlanzi3',30,'2018-11-26 16:14:37',3),('trlanzi3',48,'2018-11-26 16:14:30',4),('trlanzi3',53,'2018-11-26 16:14:33',4),('trlanzi3',57,'2018-11-26 16:14:36',4),('trlanzi3',58,'2018-11-26 16:14:28',2),('trlanzi3',65,'2018-11-25 05:56:59',4),('trlanzi3',66,'2018-11-25 05:57:02',4),('trlanzi3',67,'2018-11-26 15:59:42',3),('trlanzi4',11,'2018-11-26 16:16:44',3),('trlanzi4',52,'2018-11-26 16:16:45',4);
/*!40000 ALTER TABLE `user_problem_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `salt` char(16) NOT NULL,
  `hash` varchar(150) DEFAULT NULL,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`,`salt`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('15Qs','868ebf4612a6ed0b','0b996727b4aad603598fdb1d6389e2cdd456d05843079b1e8e99b949b8068cdc3d27a6181dff4e1c873504f42b0f6c0d5d83fd42f9eb609eb239846645d50b6c','James','Borden','DayB41'),('asdf','3fbf36a28ecef705','aaacb808d5dd991c41e954fbaae215947d99303ce1f86016f8de1ce4622f025a3046fe3aad9e1ab6f7ac9895843d8a40a8ade2fcdef17b1d2afd983d1abf8b94','asdf','asdf','asdff'),('DayB4','095a41daa5ee6add','dc7d531b2d077d104442082618ff82681bfff0a35af4b7969b06152113f1ae265392937871fc23e156e034080bdea116d48326ab5bc172decce3d5b3f2d276e4','James','Borden','DayB4@Demail.com'),('ikem','78e6b6912b6862d7','ae749a3443323af8e14f241f64a3a30fc4934696b56fd2936588a57f8bca7a1b9915188f672acc6a58434badb136b3ad0186ea0eb908f81d143c620d0dd39bf0',NULL,NULL,NULL),('ikem14','e505f9ccda70bf84','8b0eb9a675febe1b7087de5a0730e18d92dd76e6119c5a80c0706e03edcfc70a850438c5b3a9674455421a28fb7926bf5e113b56535835846da0e37194fd3c8d',NULL,NULL,NULL),('Matt Matuk','4833b178928ba595','2d1f99b6617d1c9aa5b3b0f8216c468845bb3ec33d0428cc300f26f9e06b2e6a1cfaed6644cd4cb572f21e30ff7c94fbbfa2bdac2b81d6a8cf259326d41bd489',NULL,NULL,NULL),('new1','83abbb802815afa8','922fb2246111221ecc9b079736777ffa66e6e9aab3887571d0dcdf76543ef5acc865fae03b4af8f47b6dacdce8e6e8f0418e3892f0bf667cf7434c2907a449a9',NULL,NULL,NULL),('newuser','981a8125e69e73aa','40ff6c89bea5ef67a592a6e68255956629e6e702fc2362d95a7e0bd2ce2d3718d3b0b60dfce5edc88ed619180784d7e7fff0bef9b319477a9769aa7588d0502e',NULL,NULL,NULL),('Student2319','eeb02fae5fd66ccf','ff055c3b457d5742c9b13ca2d236083b90f97a6b7baebe57ca629ee6f4f1b36deac0bd39557c221aa4a9931b4e39faf8814f58501fcb3f28aaf575de8bd61429','guy','thing','guy@thing.com'),('Test','d0a27bc9e3ea6050','e52038736b01298237c9d2ee7d40ff08d653b144b4a5c24a87a4280b98cc6f7d9ed6495172002185f89f9c1e8d7ecb240d25a400e64835110df473f7f4001129','Tim',NULL,'newguy'),('test2','b21246a6d13708b8','2e999c3f5dd6cda24e9efbb11f31c1441d7414c739a667722462392df7f5116f4ab5f94eae5f7ed59094d557214c47873d0b3c6d53c3e49dfea1fd5824ca0b4b',NULL,NULL,NULL),('test3','e402375066b88560','28d94ff4b5ade5e6df7707688490ac579daea28d46ef567e5c46e4a0f56accf2b075c63b79f27f32da0d294586a24c15724955cd841858ab4d8486e8622988be',NULL,NULL,NULL),('test5','ebd65d0355529a9e','49e736bc8f25716f6d2f759ba1817d210146cc27bf35092b07f5e773e6a207f806d5a08d0848ddf7a0bc2db6c366556754b2d0449e4d08bfe01ab46b76076de2',NULL,NULL,NULL),('test6','0244996e79f46ddc','a5d91a61134f32c648e7100c4f051912c46efbc9ecaae1fb41a827f90a0a6c6b2518eb3d7df289d8076a20f317a64955042590405a979038f312a06d769589d0','test','test','test'),('test8','ad850c025327922c','7abb3ccfad2967cc60c57c2a2b39658162e461242561afedc0d1e8e71177a6da1e5b5cf777df0aa46445b71d710208baa085aeb4bca8f2245c6aa5b19d648133','test','person','test@test.com'),('thanksjosh95','fb2724fc3622078b','338b6c2028270ab44de097bd509b10b3b889b1c0afe507c270e082fab1ed033ff2b7bf92865a5a55add3687e8299ff80eb2c5937538d229cfe7a74d0b4bbfd65',NULL,NULL,NULL),('trlanzi2','a6791e164907bcd6','d61f84477e420b0dae6eb00898239df1988b5f5065e56274e85df1d167f21a98de55d5e82561751f4a327c200fa5592c232fd49a6bcdcb6ddfedf25a916e3aa5',NULL,NULL,NULL),('trlanzi3','9a5b3af7f0ee93ab','d4f3d123911435ae60d304d692d7726589a0ab4110593939756243dad800cafcfba38a71debe88f199b111b0f5a2b5d35aceb3a9114c0c8fc0e409d7b736f5d2',NULL,NULL,NULL),('trlanzi4','d184a71bae83357f','4b20aa4d3f3982dc21c49bb4363b2c746670610d07fcc20b234c3a044648b847e3299f91427dd84749cfe9c001a4243e72c418c15bf99e308c6a4a764698309b',NULL,NULL,NULL),('trlanzi5','95cec3154e154409','c18a311980ca4728c168a7035b6a5789da24e862278275407c5a1ad11aabd64160387d32eb69615398a0f7d7d5d8c935e71a7fff58aee30f05410d120ad79a53',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `youtube_videos`
--

DROP TABLE IF EXISTS `youtube_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `youtube_videos` (
  `address` char(11) NOT NULL,
  PRIMARY KEY (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `youtube_videos`
--

LOCK TABLES `youtube_videos` WRITE;
/*!40000 ALTER TABLE `youtube_videos` DISABLE KEYS */;
INSERT INTO `youtube_videos` VALUES ('54_XRjHhZzI'),('rCxi-O79sVo'),('UukVP7Mg3TU'),('WUvTyaaNkzM');
/*!40000 ALTER TABLE `youtube_videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-11  2:12:53
