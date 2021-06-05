<p align="center">
    <a href="README-pt.md">Português</a>
</p>

<div align="center">
  <sub>WA-Project. Desenvolvido por
    <a href="https://github.com/tonicprism">Eduardo Andrade 🐺</a>
  </sub>
</div>

# Tabela de Conteúdo

- Tecnologias
- Como fazer o projeto funcionar na sua máquina
- Arquitetura do projeto

# Tecnologias

Este projeto foi feito utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [Yup](https://github.com/jquense/yup)
- [MySql](https://dev.mysql.com/doc/refman/8.0/en/)


# Como fazer o projeto funcionar na sua máquina

Instale o [chocolatey](https://chocolatey.org/install)
	
Em seguida instale o [Node.js](https://community.chocolatey.org/packages/nodejs-lts)

Provavelmente vai ser necessario reiniciar o computador

Por fim dê um Fork nesse repositório e clone na sua máquina.

Antes de inicializar o projeto, configure as variaveis ambiente, 

no arquivo .env.example tem o modelo de como são as variaveis ambiente usadas no sistema

Agora siga os passos abaixo para executar o projeto

```sh
# Instale as dependências
$ yarn


# Rode a aplicação
$ yarn start # ou npm start
```

Apos inicializar a aplicação a documentação será encontrada no link: [http://localhost:3000/v1/doc/](http://localhost:3000/v1/doc/)

Essa aplicação contem alguns arquivos e teste. 
```sh
# Acesse a pasta /src/__tests__/ para poder ler os testes validados
# Execute o seguinte comando para executar todos os testes
$ yarn test

# ou, se preferir
$ yarn test "v1/nomeDoArquivo.test.ts" # para executar o teste

```

# Arquitetura do projeto

# ./

Raiz do projeto

# ./src

Recursos do projeto

# ./src/_tests_

Arquivos de des testes

# ./src/config

Arquivos de configurações do projeto

# ./src/controllers

Arquivos responsaveis por intermediar o service e as rotas

# ./src/database

Arquivos de conexão com banco de dados, migração e possiveis seeders

# ./src/doc

Arquivos onde estão centralizados as documentações dos endpoints

# ./src/erros

Arquivos de interface para definição de tipos no Typescript

# ./src/middlewares

Arquivos de middleawares para validar o acesso as rotas

# ./src/models

Modelo de dados utilizado pelo TypeORM

# ./src/routes

Arquivos dos endpoints

# ./src/services

Arquivos para a manipulação no banco de dados

# ./src/utils

Arquivos genericos utilizado por todo o sistema

# ./src/validations

Arquivos de validação do Yup para validar os dados do usuario

# ./src/app.ts

Arquivo para inicializar os serviços de endoint e conexões com banco

# ./src/server.ts

Arquivo inicial do sistema responsavel por inicializar o serviço


# ./env.example

Arquivo referente ao .env onde fica armazenado as variaveis de ambiente

# ./package.json

Arquivo de scripts e dependencia do projeto


````sh
# scripts
	start => inicializa o sistema
	migration:create => cria as migration do banco de dados
	migration:run => executa as migraçãoes na ordem criada
	migration:revert => reverte a ultima migração executada
	test => executa todos os testes
	
```