INSERT INTO `frenchiedb`.`lvlscore` (`idlvlscore`, `modulenumber`, `lvlnumber`, `score`) VALUES ('1', '1', '1', '0');

INSERT INTO `frenchiedb`.`modulescore` (`idmodulescore`, `idlvlscore`) VALUES ('1', '1');

INSERT INTO `frenchiedb`.`user` (`iduser`, `pseudo`, `email`, `password`, `idmodulescore`) VALUES ('1', 'hugo', 'hugo@gmail.com', 'password', '1');
