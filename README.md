# **Listify** - Gerenciador de Tarefas

**Listify** é um gerenciador de tarefas desenvolvido com **Node.js**, utilizando as tecnologias **JS** e **EJS**. O objetivo do projeto é permitir que os usuários gerenciem suas tarefas de forma simples e eficiente.

## Sobre o Projeto

> Foi desenvolvido com o objetivo de aprender e aplicar os conhecimentos adquiridos sobre as tecnologias abordadas. É um projeto simples, mas que abrange uma grande variedade de conceitos importantes para o desenvolvimento web.

## Instalação

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

## Licença

> O **Listify** é licenciado sob a **MIT License**. Consulte o arquivo LICENSE para mais informações.

## Créditos

> Os ícones utilizados na aplicação foram obtidos através da API do **FontAwesome** e a estilização foi feita utilizando o **Tailwind CSS**.