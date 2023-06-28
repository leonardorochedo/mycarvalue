## My Car Value

Aplicação que o usuário consegue abrir uma solicitação para ter uma estimativa baseado em nossa base de dados de qual seria o valor estimado do carro solicitado, baseado em valor, milhas percorridas, ano do veículo, marca, modelo entre outros paramêtros.

## Projeto

Gostei muito de desenvolver este projeto mais robusto em NestJS e implementar testes unitários com Jest, foi de grande aprendizaddo. A aplicação está preparada também para ir para produção, porém não localizei uma ferramente gratuita para este fim no momento.

Achei muito bacana também como funciona o conceito de middlewares, interruptores, serialização e como agregam positivamente na estrutura do projeto.

## Tecnologias utilizadas

- NestJS: Framework em Node.js para construção de aplicativos escaláveis e eficientes.
- TypeORM:
- Banco de Dados: SQLite, utilizado pelo TypeORM para armazenar os dados da aplicação.
- Jest: Para testes unitários e também e2e (end-to-end).
- Cookie-Session: Middleware para os endpoints da aplicação
- Class-Validator: Definir regras de validação de forma declarativa utilizando decorators, o que tornou o código mais limpo e intuitivo.
- Class-Transformer: Usado para consumir um dado x e manipula-lo.
- Cross-Env: Manipulação de váriveis de ambiente via shell.

## Endpoints da API

A API possui os seguintes endpoints:

### User

- `GET /auth`: Retorna uma lista dos usuários cadastrados no sistema.
- `GET /auth/:id`: Retorna o usuário com o ID especificado.
- `GET /auth/whoiam`: Retorna o usuário que está autenticado no sistema.
- `POST /auth/signup`: Cadastra um novo usuário.
- `POST /auth/signin`: Loga o usuário na aplicação.
- `POST /auth/signout`: Desloga o usuário da aplicação.
- `PATCH /auth/:id`: Edita o usuário com o ID especificado.
- `DELETE /auth/:id`: Deleta o usuário com o ID especificado.

### Report

- `POST /reports/create`: Cria uma solicitação (report) de veíuculo.
- `PATCH /reports/:id`: Aprova ou nega a solicitação do veículo do usuário (apenas admin).
- `GET /reports/estimate`: Retorna a estimativa do valor de seu veículo.

## Executando o projeto localmente

Para executar o projeto localmente em sua máquina, siga as etapas abaixo:

1. Certifique-se de que o Node.js e o npm (gerenciador de pacotes do Node.js) estejam instalados em sua máquina.

2. Clone este repositório em um diretório de sua escolha:

```shell
git clone https://github.com/leonardorochedo/mycarvalue.git
```

3. Acesse o diretório do projeto:

```shell
cd mycarvalue
```

4. Instale as dependências do projeto:

```shell
npm install
```

5. Execute os testes unitários:

```shell
npm run test
```

6. Execute os testes (e2e):

```shell
npm run test:e2e
```

7. Realize a migration (DB):

```shell
npm run typeorm migration:run
```

8. Execute o projeto:

```shell
npm run start
```

Após executar essas etapas, o servidor estará em execução localmente na URL _ttp://localhost:3000_ e você poderá acessar os endpoints da API mencionados anteriormente.

## Testes

Foram implementados testes unitários e também e2e (end-to-end) para os endpoints da API, validando funcionalidades e camadas da aplicação como services e controllers.

**Observação:** Certifique-se de ter o banco de dados SQLite configurado corretamente. Verifique a documentação do TypeORM para mais informações sobre como configurar o banco de dados.
