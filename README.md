# NodeJS-Interview

O objetivo deste projeto é fazer o cadastro e a listagem das cidades, e o CRUD de clientes.

![GitHub version node](https://img.shields.io/badge/node-%3E%3D%2016.13.0-brightgreen)
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) >= v16.13.0.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [tsyringe](https://github.com/microsoft/tsyringe)
- [Date-fns](https://date-fns.org/docs/Getting-Started)
- [Jest](https://jestjs.io/pt-BR/)

### 🎲 Rodando o Back End

```bash
# Clone este repositório
$ git clone https://github.com/stephanyPereira/Desafio-Compass.git

# Acesse a pasta do projeto no terminal/cmd
$ cd Desafio-Compass

# Instale as dependências
$ npm install

# Criar contêiner. Obs.: Caso algum parâmetro seja alterado trocar a informação no ormconfig.json também
$ docker run --name desafioCompasso -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Execute as migrations com o comando
$ npm run typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>

# Execute os testes
$ npm run test

```


### Autor
---

<a href="https://github.com/stephanyPereira">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/80916986?s=400&u=3c85b808df2406e85877f2eefe8b3a69cc1407c8&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Stephany dos Santos Pereira</b></sub></a>


Feito com ❤️ por Stephany Pereira
