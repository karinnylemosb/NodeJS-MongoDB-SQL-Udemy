const express = require('express');
const server = express();

const cursos = ['NodeJS', 'JavaScript', 'React Native'];

// Listando todos os cursos:
server.get('/cursos', (req, res) => {
  return res.json(cursos);
});

// Localizando por ID:
server.get('/cursos/:index', (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
});

// Criando

server.listen(3000);
