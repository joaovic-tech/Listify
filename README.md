# **Listify** - Gerenciador de Tarefas

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
![Tailwindcss](https://img.shields.io/badge/Tailwindcss-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

![License: MIT](https://img.shields.io/badge/Mit-License-blue.svg)

</div>

|  Light Mode                         |
|:-----------------------------------:|
|  ![](./templates/Desktop-Light.png)  |
|  ![](./templates/Mobile-Light.png)     |
|  Dark Mode                          |
|  ![](./templates/Desktop-Dark.png) |
|  ![](./templates/Mobile-Dark.png)  |


> Status do Projeto: :heavy_check_mark: (concluido)

### Tópicos 

:small_blue_diamond: [Deploy da Aplicação](https://listify-2kqb.onrender.com)

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação)

:small_blue_diamond: [Configurações](#configurações)

:small_blue_diamond: [Tecnologias utilizadas](#tecnologias-utilizadas)

:small_blue_diamond: [Dependências](#dependências)

---
                        
## Descrição do projeto

**Listify** é um gerenciador de tarefas desenvolvido com **Node.js**, utilizando as tecnologias **JS** e **EJS**. O objetivo do projeto é permitir que os usuários gerenciem suas tarefas de forma simples e eficiente.

> Foi desenvolvido com o objetivo de aprender e aplicar os conhecimentos adquiridos sobre as tecnologias abordadas. É um projeto simples, mas que abrange uma grande variedade de conceitos importantes para o desenvolvimento web.

## Funcionalidades

:heavy_check_mark: Adicionar, editar e excluir tarefas.
:heavy_check_mark: Marca a tarefa como concluída
:heavy_check_mark: Buscar uma tarefa desejada

## Como rodar a aplicação

> Para **instalar** o `código completo`, basta clonar o repositório em sua máquina e instalar as dependências necessárias. Para isso, utilize o seguinte comando:

```bash
git clone https://github.com/joaovic-tech/listify.git
cd listify
npm i
```

## Configurações

> A aplicação faz uso de um arquivo de configuração chamado `.env` para armazenar informações sensíveis. Abaixo seguem exemplos de algumas das variáveis de ambiente necessárias para rodar a aplicação, com valores genéricos para fins de exemplificação:

```dotenv
CONNECTIONSTRING=mongodb+srv://usuario:senha@cluster.mongodb.net/banco?retryWrites=true&w=majority
SECRETSESSION='secret'
TOKEN_SECRET=my_secret_token
```

## Tecnologias utilizadas

O Listify foi desenvolvido utilizando as seguintes tecnologias:

* Node.js
* JavaScript
* Tailwind Css
* EJS
* Express
* MongoDB


## Dependências

As dependências do Listify são:

```json
"devDependencies": {
    "nodemon": "^2.0.20"
},
"dependencies": {
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.1",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^4.6.0",
    "dayjs": "^1.11.7",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.0",
    "marked": "^4.2.5",
    "mongoose": "^6.8.1",
    "multer": "^1.4.5-lts.1",
    "node-notifier": "^10.0.1",
    "serve-static": "^1.15.0",
    "validator": "^13.9.0"
}
```

## Segurança

O Listify traz segurança para seus usuários!

A importância de manter as senhas seguras e confidenciais. Por isso, utilizei o algoritmo bcrypt para criptografar a senha cadastrada ao criar ou editar sua conta na aplicação.

O bcrypt é um dos algoritmos de hash de senhas mais seguros disponíveis atualmente. Ele garante que suas senhas sejam armazenadas de forma segura e protegida contra ameaças externas, como ataques de hackers e vazamentos de dados.

> **Aqui está um exemplo de como a senha `HASH` fica armazenada no banco:**
> ![](./templates/DemonstraçãoSEnhaHask.png)

## Licença

> O **Listify** é licenciado sob a **MIT License**. Consulte o arquivo [LICENSE](https://github.com/joaovic-tech/Listify/blob/main/LICENSE) para mais informações.

## Créditos

> Os ícones utilizados na aplicação foram obtidos através da API do **FontAwesome** e a estilização foi feita utilizando o **Tailwind CSS**.

Copyright :copyright: 2023 - Listify