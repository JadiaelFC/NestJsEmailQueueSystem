# NestJS Email Queue System

Este projeto é uma aplicação NestJS que implementa um sistema de fila para gerenciamento de e-mails usando BullMQ e Redis, com a capacidade de visualizar e gerenciar filas através do Bull Board. Ele também integra o NodeMailer com templates do Handlebars para enviar e-mails.

## Características

- **Fila de E-mails com BullMQ e Redis:** Utiliza o BullMQ para criar filas de e-mails e o Redis como armazenamento de dados da fila.
- **Envio de E-mails com NodeMailer:** Configura o NodeMailer para enviar e-mails usando templates Handlebars.
- **Dashboard Bull Board:** Permite monitorar e gerenciar as filas de e-mails através de uma interface web.
- **Sistema de Usuários Simples:** Funcionalidade básica para criação e recuperação de usuários.

## Pacotes Utilizados

- `@nestjs/common`, `@nestjs/core`: Core do NestJS.
- `@nestjs-modules/mailer`: Integração do NodeMailer com NestJS.
- `@nestjs/bullmq`, `bullmq`: Implementação de filas com BullMQ.
- `@bull-board/nestjs`, `@bull-board/api`: Dashboard Bull Board para NestJS.
- `handlebars`: Motor de templates para e-mails.
- `@nestjs/config`: Permite ter diferentes definições de configuração com .env's
- `@nestjs/swagger`: Cria uma OpenAPI
## Estrutura do Projeto

- **src/mailer**:
  - `templates/welcome.hbs`: Template de e-mail de boas-vindas.
- **src/users**:
  - `users.module.ts`: Módulo de usuários, inclui configuração da fila.
  - `users.service.ts`: Serviço de usuários, lida com criação de usuário e adição de trabalho na fila.
  - `users.controller.ts`: Controlador de usuários para interação via API.

## Benefícios do Projeto

- **Desacoplamento e Escalabilidade:** A utilização de filas permite o desacoplamento entre a criação de usuários e o envio de e-mails, aumentando a escalabilidade.
- **Eficiência no Processamento:** Filas com BullMQ e Redis melhoram a eficiência e confiabilidade do processamento de e-mails.
- **Facilidade de Monitoramento:** O Bull Board oferece uma interface visual para monitorar e gerenciar as filas, facilitando a identificação e solução de problemas.

## Configuração e Uso

1. **Instalação das Dependências:**
   ```bash
   npm install
   ```
2. **Configuração do Ambiente:**
   ```
   Defina as variáveis de ambiente necessárias (ex: MAIL_HOST, MAIL_USERNAME, MAIL_PASSWORD, MAIL_PORT REDIS_HOST, REDIS_PORT e REDIS_PASSWORD) no arquivo .env.
   ```
3. **Executando a Aplicação:**
   ```sh
   npm run start
   ```
4. **Acessando o Bull Board:**
   ```sh
   Navegue até http://localhost:3000/queues para visualizar o dashboard do Bull Board.
   ```
   **Contribuições e Suporte:**
   ```txt
   Contribuições são bem-vindas! Para contribuir, por favor, abra um pull request com suas sugestões de melhorias ou correções.
   ```
