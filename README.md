<h1 align="center">
  <img alt="Logo" src="https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/static/home/thespacedevs/images/round_logo.svg" width="200px">
</h1>

<h3 align="center">
    Space Flight News API
</h3>

<p align="center">Back-end Developer Challenge | Coodesh</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lrocha09/space-flight-news-challenge-api?color=077DF2">

  <a href="https://github.com/lrocha09" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-lucas%20rocha-077DF2">
  </a>

   <img alt="Repository size" src="https://img.shields.io/github/repo-size/lrocha09/space-flight-news-challenge-api?color=077DF2">

  <a href="https://github.com/lrocha09/space-flight-news-challenge-api/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lrocha09/space-flight-news-challenge-api?color=077DF2">
  </a>

  <a href="https://github.com/lrocha09/space-flight-news-challenge-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lrocha09/space-flight-news-challenge-api?color=077DF2">
  </a>

</p>

<p align="center">
  <a href="#descrição-do-projeto">Descrição do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#executando-o-projeto">Executando o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#variáveis-de-ambiente">Variáveis de Ambiente</a>
</p>

## Descrição do Projeto

Desafio Coodesh

## Tecnologias

Tecnologias utilizadas para o desenvolvimeno da API:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/pt-br/)
- [Npm](https://www.npmjs.com/)
- [Swagger](https://swagger.io/)
- [Axios](https://axios-http.com/)
- [Bull](https://github.com/OptimalBits/bull/)
- [Redis](https://redis.io/)
- [Node Cron](https://github.com/kelektiv/node-cron/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://www.npmjs.com/package/supertest/)
- [Uuid v4](https://github.com/thenativeweb/uuidv4/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Executando o Projeto

### Requisitos Necessários

- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/) ou [Yarn](https://classic.yarnpkg.com/)
- Ter [MongoDB](https://www.mongodb.com/pt-br) e [Redis](https://redis.io/) instalados em sua máquina

> Obs.: Recomendado utilizar o docker, as configurações para conexão estão no arquivo `.env`

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/lrocha09/space-flight-news-challenge-api.git && cd space-flight-news-challenge-api
```

**Para utilizar o docker com as configurações do arquivo "docker-compose.yml"**

```bash
$ make up

$ make down

$ make logs
```

**Siga os passos abaixo**

```bash
# Instale todas as dependências necessárias:
$ npm install

# Para iniciar o servidor da API:
$ npm run start

# Caso queira iniciar o servidor da API em modo assistido:
$ npm run start:dev

# Para iniciar o servidor da API em produção:
$ npm run start:prod

# Após isso, o projeto pode ser inicializado e os endpoints estarão prontos para ser utilizados!
```

**Comandos para executar testes**

```bash
# Para executar testes de todos os endpoints:
$ npm run test:e2e

# Para executar um teste específico do projeto:
$ npm run test:e2e "nome do arquivo"
```

### Documentação da API

Para ter acesso a documentação do projeto, contendo todas as informações para utilizar os
endpoints da API, é necessário utilizar como no exemplo abaixo, lembrando que o servidor
da API necessita estar inicializado.

> Obs.: É possível alterar o padrão de rota "/docs" para algum desejado, para isso temos a variável de ambiente "APP_DOCS_PATH".

```bash
# Documentação swagger.
Ex.: http://localhost:3000/docs ou http://www.dominio-api.com/docs
```

## Variáveis de Ambiente 

**Variáveis de ambiente presentes no .env do projeto**

```bash
# Porta que o servidor do nodejs utilizará.
SERVER_PORT=3333

# URL de acesso ao banco de dados do mongodb.
DB_URL=[Mongodb url]

# REDIS CONFIGS #
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASS=[Redis password]

# Variáveis para configuração de documentação do Swagger.
APP_EXPOSE_DOCS=true
APP_NAME=Space Flight News API
APP_VERSION=1.0
APP_DOCS_PATH=docs

# Url base para efetuar consultas a api da Spaceflight News
BASE_URL_SPACEFLIGHT=https://api.spaceflightnewsapi.net/v3
```

---

Projeto Desenvolvido por [Lucas Rocha](linkedin.com/in/lrocha09/) 👨🏾‍💻.

> This is a challenge by [Coodesh](https://coodesh.com/)
