const express = require('express');
const server = express();

server.use(express.json());

const cursos = ['NodeJS', 'JavaScript', 'React Native'];

// Middleware Global :
server.use((req, res, next) => {
  console.log(`URL CHAMADA: ${req.url}`);

  return next();
});

// Checando se o nome do curso foi inserido:
function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Nome do curso é obrigatório!!' });
  }
  return next();
}

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
  if (!curso) {
    return res.status(400).json({ error: 'O curso não existe!!' });
  }
  return next();
}

// Listando todos os cursos:
server.get('/cursos', (req, res) => {
  return res.json(cursos);
});

// Localizando por ID:
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
});

// Criando um novo curso:
server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);
  return res.json(cursos);
});

// Atualizando um curso existente:
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  cursos[index] = name;
  return res.json(cursos);
});

// Excluindo algum curso:
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params;
  cursos.splice(index, 1);
  return res.json(cursos);
});

server.listen(3000);
