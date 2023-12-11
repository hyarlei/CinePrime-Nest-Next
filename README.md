<p align="center">
  <img alt="CinePrime" src=".github/Image_Cinema.jpg">
</p>

## Sobre o repositório

Esse repositório contém a continuação da aplicação de gerenciamento de cinema que tem com o objetivo aplicar e aprimorar conhecimentos de fermentas atuais utilizadas no projeto. [https://github.com/hyarlei/-CinePrime](https://github.com/hyarlei/-CinePrime)

## Rodar a aplicação

A aplicação está dividida em:

- Nest.js (backend - API)
- Next.js (frontend - Web)
- PostgreSQL (banco de dados)

É necessário gerar um projeto no Google Cloud Platform e habilitar a API do Google Maps. Após isso, crie uma credencial para a API e adicione no arquivo `.env` na raiz do projeto Next.js e no Nest.js.

Rode o projeto:

```bash
docker compose up
```

### Nest.js

Acesse o container:

```bash
docker compose exec nestjs bash
```

Instale as dependências e configure o prisma:

```bash
npm install
npx prisma generate
```

Rode o projeto:

```bash
npm run start:dev
```

### Next.js

Acesse o container:

```bash
docker compose exec nextjs bash
```

Instale as dependências:

```bash
npm install
```

Rode o projeto:

```bash
npm run dev
```

Existe um arquivo na raiz do projeto Nest.js, o `api.http` que você pode usar para testar a aplicação com o plugin do VSCode [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). Quando enviar dados na requisição, o Nest.js consumirá a mensagem e mostrará no console.