# Meus Livros

Sistema web para registro de livros e páginas lidas, feito com React, Node.js, Express e SQLite.

## Tecnologias

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Banco de Dados:** SQLite (better-sqlite3)

## Como rodar o projeto

### 1. Backend


cd backend
npm install
node initDB.js
npm start


O servidor vai rodar em `http://localhost:8800`. 
Se, por qualquer motivo, não rodar nessa porta, devesse alterar o endereço das rotas. 

### 2. Frontend


cd frontend
npm install
npm start


O frontend vai abrir em `http://localhost:3000`.


## Funcionalidades

- Listagem de livros em cards
- Adicionar novo livro
- Visualizar detalhes do livro com histórico de leituras
- Registrar páginas lidas com data
- Editar informações do livro
- Deletar livro

## Estrutura do Banco de Dados

### Tabela `livros`
- id (INTEGER, chave primária)
- titulo (TEXT)
- autor (TEXT)
- genero (TEXT)
- totalPaginas (INTEGER)
- status (TEXT: "Lendo", "Finalizado", "Quero Ler")

### Tabela `leituras`
- id (INTEGER, chave primária)
- livro_id (INTEGER, chave estrangeira)
- paginasLidas (INTEGER)
- data (TEXT)

## Aluno

Lucas Antonio Pelanda
