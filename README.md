# RaquetMatch API

![RaquetMatch Logo](https://via.placeholder.com/150x50?text=RaquetMatch)

## 🎾 Sobre o Projeto

A RaquetMatch API é o backend do aplicativo mobile RaquetMatch, uma plataforma de intermediação entre alunos e professores de esportes de raquete. Esta API gerencia o cadastro de usuários, perfis de professores, buscas geoespaciais, agendamentos de aulas e muito mais.

### Principais Funcionalidades

- Gerenciamento de usuários (alunos e professores)
- Perfis detalhados de professores com especialidades e disponibilidade
- Sistema de busca por proximidade
- Agendamento de aulas
- Autenticação e autorização via JWT

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Fastify** - Framework web de alta performance
- **MongoDB** - Banco de dados NoSQL com suporte a consultas geoespaciais
- **Docker** - Conteinerização para ambiente consistente
- **JWT** - Autenticação e autorização

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v14+)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

## 🚀 Instalação e Configuração

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/raquet-api.git
cd raquet-api
```

### Configurando Variáveis de Ambiente

1. Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas configurações:

```
PORT=3000
NODE_ENV=development

# Configurações do MongoDB
MONGO_USER=seu_usuario
MONGO_PASSWORD=sua_senha
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=raquetdb

# Configurações do Mongo Express
MONGO_EXPRESS_USER=seu_usuario
MONGO_EXPRESS_PASSWORD=sua_senha

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura
```

⚠️ **IMPORTANTE**: Nunca compartilhe seu arquivo `.env` com valores reais ou faça commit dele no repositório.

### Iniciando com Docker

1. Inicie os containers do MongoDB e Mongo Express:

```bash
docker-compose up -d
```

2. Aguarde os containers estarem prontos e então inicie a aplicação:

```bash
npm install
npm run dev
```

### Sem Docker (Desenvolvimento Local)

Se preferir usar um MongoDB já instalado em sua máquina:

1. Ajuste as configurações no `.env` para apontar para sua instalação do MongoDB
2. Instale as dependências e inicie a aplicação:

```bash
npm install
npm run dev
```

## 📝 Documentação da API

A documentação completa da API está disponível via Swagger UI:

- **URL do Swagger**: [http://localhost:3000/docs](http://localhost:3000/docs)

Esta documentação interativa permite explorar todos os endpoints, parâmetros e testar as funcionalidades da API diretamente pelo navegador.

## 🚦 Endpoints Principais

- **Autenticação**: `/auth/login`
- **Usuários**: `/users`
- **Perfis de Professores**: `/teachers`
- **Busca de Professores**: `/teachers/search`

## 📂 Estrutura do Projeto

```
src/
├── models/           # Modelos do MongoDB
├── plugins/          # Plugins do Fastify
├── routes/           # Rotas da API
│   ├── auth/         # Autenticação
│   ├── users/        # Gerenciamento de usuários
│   └── teachers/     # Perfis de professores
├── schemas/          # Schemas comuns
└── app.js            # Configuração principal
```

## 📋 To-Do

- [ ] Implementar sistema de agendamentos
- [ ] Adicionar busca geoespacial para encontrar professores próximos
- [ ] Desenvolver sistema de avaliações de professores
- [ ] Implementar notificações
- [ ] Implementar sistema de pagamentos
- [ ] Desenvolver testes automatizados (em breve)

## 🧪 Testes

Os testes automatizados serão desenvolvidos em breve. Por enquanto, você pode testar manualmente usando o Swagger ou ferramentas como Insomnia/Postman.

```bash
# Quando disponíveis, os testes poderão ser executados com:
npm test
```

## 📱 Aplicação Mobile

Esta API serve como backend para o aplicativo mobile RaquetMatch, disponível para Android e iOS, que facilita a conexão entre alunos e professores de esportes de raquete.

## 📄 Licença

[MIT](LICENSE)

---

Desenvolvido por [Sua Empresa/Equipe] © 2023
