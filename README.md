<table align="center"><tr><td align="center" width="9999">
<img src="https://spaceflightnewsapi.net/img/SNAPI_logo.png" align="center" width="200px" alt="Project icon">

<h4>API Space Flight News</h4>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lrocha09/space-flight-news-challenge-api?color=1b96f3">

  <a href="https://github.com/lrocha09" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-lucas%20rocha-1b96f3">
  </a>
  
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/lrocha09/space-flight-news-challenge-api?color=1b96f3">

  <a href="https://github.com/lrocha09/space-flight-news-challenge-api/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lrocha09/space-flight-news-challenge-api?color=1b96f3">
  </a>


  <a href="https://github.com/lrocha09/space-flight-news-challenge-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lrocha09/space-flight-news-challenge-api?color=1b96f3">
  </a>

</p>

<p align="center">
  <a href="#descrição-do-projeto">Descrição do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#executando-o-projeto">Executando o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#variáveis-de-ambiente">Variáveis de Ambiente</a>&nbsp;&nbsp;&nbsp;
</p>

</td></tr>
</table>

## Descrição do Projeto

A [Space Flight News](https://www.spaceflightnewsapi.net/) fornece as melhores informações de notícias relacionadas a voos espaciais. Através dessa API poderemos criar nossa extensão da [Space Flight News](https://www.spaceflightnewsapi.net/), criando, editando, removendo e visualizando novos artigos, além de atualizar nossa base de dados automaticamente, utilizando rotinas.

## Tecnologias

Tecnologias utilizadas para o desenvolvimeno da API:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://redis.io/)
- [Bull](https://github.com/OptimalBits/bull/)
- [Npm](https://www.npmjs.com/)
- [Swagger](https://swagger.io/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://www.npmjs.com/package/supertest/)
- [Uuid v4](https://github.com/thenativeweb/uuidv4/)

## Executando o Projeto

### Requisitos Necessários

- [Node.js](https://nodejs.org/en/) (Foi utilizada a versão 18.12.1 durante o desenvolvimento)
- [Npm](https://www.npmjs.com/) ou [Yarn](https://classic.yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) e [Redis](https://redis.io/) instalado em sua máquina

> Obs.: Recomendado utilizar o docker, a URL de conexão pode ser configurada através do .env.

**Clone o projeto e acesse a pasta:**

```bash
$ git clone https://gitlab.com/lrocha09/space-flight-news-challenge-api && cd space-flight-news-challenge-api
```

**Iniciar o servidor da API:**

```bash
# Instale todas as dependências necessárias:
$ npm install

# Para iniciar o servidor da API:
$ npm run start

# Caso queira iniciar o servidor da API em modo assistido:
$ npm run start:dev

# Para iniciar o servidor da API em produção:
$ npm run start:prod
```

**Ambiente docker:**

```bash
#  Cria o nosso contêiner, prepara e inicia o ambiente:
$ make up

# Interrompe e remove todos os contêineres:
$ make down

# Para vizualizar os logs dos contêineres:
$ make logs
```

**Executar testes:**

```bash
# Para executar todos os testes unitários:
$ npm run test

# Para executar todos os testes e2e:
$ npm run test:e2e

# Para executar um teste específico do projeto:
$ npm run test:e2e "nome do arquivo"

# Para executar todos os testes coverage:
$ npm run test:cov
```

### Documentação da API

Para ter acesso a documentação do projeto, contendo todas as informações para utilizar os
endpoints da API, é necessário utilizar como no exemplo abaixo, lembrando que o servidor
da API necessita estar inicializado.

> Obs.: É possível alterar o padrão de rota "/docs" para algum desejado, para isso temos a variável de ambiente "APP_DOCS_PATH".

```bash
# Documentação swagger.
Ex.: http://localhost:3333/docs ou http://www.dominio-api.com/docs
```

## Variáveis de Ambiente

**Variáveis de ambiente presentes no .env do projeto:**

```bash
# Porta que o servidor do Node.js utilizará.
SERVER_PORT=3333

# URL de acesso ao banco de dados do MongoDB.
DB_URL=mongodb://localhost/space-flight-news-api

# Variáveis para configuração de documentação do Swagger.
APP_EXPOSE_DOCS=true
APP_NAME=Space Flight News API
APP_VERSION=1.0
APP_DOCS_PATH=docs

# Variáveis para configuração do Redis.
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASS=redis

# URL base para efetuar consultas a API da Spaceflight News.
BASE_URL_SPACEFLIGHT=https://api.spaceflightnewsapi.net/v3
```
