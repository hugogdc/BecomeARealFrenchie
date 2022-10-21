CREATE TABLE `frenchiedb`.`module1lvl` (
  `idmodule1lvl` INT NOT NULL,
  `fridioms` VARCHAR(50) NULL,
  `enidioms` VARCHAR(50) NULL,
  PRIMARY KEY (`idmodule1lvl`));

CREATE TABLE `frenchiedb`.`module2lvl` (
  `idmodule2lvl` INT NOT NULL,
  `imagepath` VARCHAR(45) NULL,
  `answer` VARCHAR(45) NULL,
  PRIMARY KEY (`idmodule2lvl`));

CREATE TABLE `frenchiedb`.`module3lvl` (
  `idmodule3lvl` INT NOT NULL,
  `data` VARCHAR(100) NULL,
  PRIMARY KEY (`idmodule3lvl`));


CREATE TABLE `frenchiedb`.`lvlscore` (
  `idlvlscore` INT NOT NULL,
  `modulenumber` INT NOT NULL,
  `lvlnumber` INT NOT NULL,
  `score` INT NULL,
  PRIMARY KEY (`idlvlscore`));

CREATE TABLE `frenchiedb`.`modulescore` (
  `idmodulescore` INT NOT NULL,
  `idlvlscore` INT NOT NULL,
  PRIMARY KEY (`idmodulescore`),
  FOREIGN KEY (idlvlscore) REFERENCES lvlscore(idlvlscore));

CREATE TABLE `frenchiedb`.`user` (
  `iduser` INT NOT NULL,
  `pseudo` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `idmodulescore` INT NULL,
  PRIMARY KEY (`iduser`),
  FOREIGN KEY (idmodulescore) REFERENCES modulescore(idmodulescore));
