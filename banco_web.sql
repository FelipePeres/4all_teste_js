-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 14-Maio-2019 às 00:02
-- Versão do servidor: 10.1.35-MariaDB
-- versão do PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banco_web`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cartoes`
--

CREATE TABLE `cartoes` (
  `id` int(11) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `bandeira` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cartoes`
--

INSERT INTO `cartoes` (`id`, `numero`, `bandeira`, `createdAt`, `updatedAt`, `clienteId`) VALUES
(146, '93893', 'MasterClass', '2019-05-10 15:40:44', '2019-05-10 15:43:25', 1),
(149, '8479749819', 'Visa', '2019-05-13 00:10:36', '2019-05-13 00:10:36', 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `numero` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `saldo` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `numero`, `email`, `senha`, `saldo`, `createdAt`, `updatedAt`) VALUES
(1, 'Felipe Peres', 180215, 'felippe@gmail.com', '2207', '-828.90', '2019-04-13 11:31:41', '2019-05-13 15:58:46'),
(2, 'Mariana Santos', 150218, 'mariana@gmail.com', '1206', '250.00', '2019-04-13 11:33:53', '2019-05-13 01:13:53'),
(3, 'Marilda Garcia', 150345, 'marilda@gmail.com', '0410', '150.00', '2019-04-17 00:14:55', '2019-05-13 01:12:40'),
(4, 'Renato da Silva', 150275, 'renato@gmail.com', '1305', '1228.90', '2019-04-17 00:16:02', '2019-05-13 15:58:46');

-- --------------------------------------------------------

--
-- Estrutura da tabela `contatos`
--

CREATE TABLE `contatos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `banco` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteContatoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `contatos`
--

INSERT INTO `contatos` (`id`, `nome`, `numero`, `banco`, `createdAt`, `updatedAt`, `clienteContatoId`) VALUES
(28, 'Pai', 150275, '', '2019-05-01 05:06:50', '2019-05-01 05:06:50', 1),
(37, 'Marido', 150275, '', '2019-05-13 01:12:17', '2019-05-13 01:12:17', 3),
(38, 'Namorada', 150218, '', '2019-05-13 01:13:30', '2019-05-13 01:13:30', 1),
(39, 'Filho', 180215, '', '2019-05-13 01:38:59', '2019-05-13 01:38:59', 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `transferecia`
--

CREATE TABLE `transferecia` (
  `id` int(11) NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `valor_devido` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteEnvId` int(11) DEFAULT NULL,
  `contatoRecId` int(11) DEFAULT NULL,
  `tem_cartao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `transferecia`
--

INSERT INTO `transferecia` (`id`, `valor`, `valor_devido`, `createdAt`, `updatedAt`, `clienteEnvId`, `contatoRecId`, `tem_cartao`) VALUES
(153, '50.00', '0.00', '2019-05-13 01:09:46', '2019-05-13 01:09:46', 1, 28, NULL),
(154, '50.00', '0.00', '2019-05-13 01:12:40', '2019-05-13 01:12:40', 3, 37, NULL),
(155, '50.00', '0.00', '2019-05-13 01:13:53', '2019-05-13 01:13:53', 1, 38, NULL),
(156, '50.00', '0.00', '2019-05-13 01:39:07', '2019-05-13 01:39:07', 4, 39, NULL),
(158, '50.00', '0.00', '2019-05-13 01:54:34', '2019-05-13 01:54:34', 1, 28, NULL),
(159, '928.90', '-828.90', '2019-05-13 15:58:46', '2019-05-13 15:58:46', 1, 28, 146);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartoes`
--
ALTER TABLE `cartoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clienteId` (`clienteId`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contatos`
--
ALTER TABLE `contatos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clienteContatoId` (`clienteContatoId`);

--
-- Indexes for table `transferecia`
--
ALTER TABLE `transferecia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clienteEnvId` (`clienteEnvId`),
  ADD KEY `contatoRecId` (`contatoRecId`),
  ADD KEY `transferecia_ibfk_3` (`tem_cartao`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartoes`
--
ALTER TABLE `cartoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contatos`
--
ALTER TABLE `contatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `transferecia`
--
ALTER TABLE `transferecia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `cartoes`
--
ALTER TABLE `cartoes`
  ADD CONSTRAINT `cartoes_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limitadores para a tabela `contatos`
--
ALTER TABLE `contatos`
  ADD CONSTRAINT `contatos_ibfk_1` FOREIGN KEY (`clienteContatoId`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limitadores para a tabela `transferecia`
--
ALTER TABLE `transferecia`
  ADD CONSTRAINT `transferecia_ibfk_1` FOREIGN KEY (`clienteEnvId`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transferecia_ibfk_2` FOREIGN KEY (`contatoRecId`) REFERENCES `contatos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transferecia_ibfk_3` FOREIGN KEY (`tem_cartao`) REFERENCES `cartoes` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
