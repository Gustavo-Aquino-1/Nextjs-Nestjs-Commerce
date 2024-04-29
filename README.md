
# GAX - Ecommerce

A GAX é o melhor ecommerce que você utlizará, oferecendo modernidade, simplicidade e preços acessíveis. Como "O Ecommerce do futuro", destaca-se pela interface intuitiva, compromisso com a qualidade dos produtos e excelência no atendimento ao cliente. Se você busca uma experiência de compra extraordinária, a GAX é a escolha certa.

## Como é o site ?

Veja o website aqui: [link GAX](https://www.youtube.com/watch?v=yXqxkRumzAw) 

## Stacks utilizadas

**Front-end:** NextJs, NextAuth, TailwindCSS, Axios

**Back-end:** NestJs, Nodemailer

**Outros:** Prisma, MySQL, Docker


## Documentação da API

#### Login

```
  POST /auth/login
```

| Parâmetro   | Tipo       | ;Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email do usuário|
| `password` | `string` | **Obrigatório**. Senha do usuário|

Atenção, todos os parâmetros acima, são recebidos pelo body em formato JSON.

#### Criar usuário

```
  POST /auth/user
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` | **Obrigatório**. Nome do usuário|
| `email` | `string` | **Obrigatório**. Email do usuário|
| `password` | `string` | **Obrigatório**. Senha do usuário|
| `role` | `string` | Role do usuário|

Atenção, todos os parâmetros acima, são recebidos no body em formato JSON.

#### Retornar produtos

```
  GET /product
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` |  Nome do Produto|
| `minPrice` | `number` |  Preço minímo do Produto|
| `maxPrice` | `number` |  Preço máximo do Produto|
| `type` | `string` | Tipo do Produto|
| `line` | `string` | Linha do Produto|
| `take` | `number` | Quantidade de Produtos |
| `notIn` | `number[]` | Ids dos produtos não desejados |

Atenção, todos parâmetros acima, são do tipo query, vindos da URL.

#### Retorna produto pelo id

```
  GET /product/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `number` | Id do produto|


#### Criar produtos

```
  POST /product
```

Atenção: Essa rota necessita de autenticação, e só pode ser utilizada com a role admin.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` | **Obrigatório**. Nome do Produto|
| `price` | `number` | **Obrigatório**. Preço do Produto|
| `description` | `string` | **Obrigatório**. Descrição do Produto|
| `type` | `string` | **Obrigatório**. Tipo do Produto|
| `line` | `string` | **Obrigatório**. Linha do Produto|
| `img` | `string` | **Obrigatório**. Imagem do Produto |
| `sizeId` | `number` | **Obrigatório**. Id da categoria de tamanho |

Atenção, todos os parâmetros acima, são recebidos no body em formato JSON.

#### Atualizar produtos

```
  PUT /product
```

Atenção: Essa rota necessita de autenticação, e só pode ser utilizada com a role admin.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` | Nome do Produto|
| `price` | `number` | Preço do Produto|
| `description` | `string` | Descrição do Produto|
| `type` | `string` | Tipo do Produto|
| `line` | `string` | Linha do Produto|
| `img` | `string` | Imagem do Produto |
| `sizeId` | `number` | Id da categoria de tamanho |

Atenção, todos os parâmetros acima, são recebidos no body em formato JSON.

#### Deletar produtos

```
  DELETE /product/:id
```

Atenção: Essa rota necessita de autenticação, e só pode ser utilizada com a role admin.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `number` | Id do Produto|

#### Retorna produtos favoritados

```
  GET /favorite
```

Atenção: Essa rota necessita de autenticação.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `startIn` | `number` | Começa a partir desse registro|
| `take` | `number` | Quantidade de produtos a retornar|


Atenção, todos parâmetros acima, são do tipo query, vindos da URL.


#### Favoritar produto / checar se um produto é favorito

```
  PATCH /favorite/:id
```

Atenção: Essa rota necessita de autenticação.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `number` | Id do produto|
| `check` | `string` | modo de checagem |


Atenção, todos parâmetros acima (exceto id), são do tipo query, vindos da URL.

#### Criar pedido

```
  POST /order
```

Atenção: Essa rota necessita de autenticação.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `total` | `number` | Total do pedido|
| `cep` | `string` | Cep do usuário |
| `number` | `number` | Número do usuário |
| `paymentType` | `string` | Tipo do pagamento |
| `products` | `OrderProduct[]` | Produtos do pedido |


interface OrderProduct { 
    productId: number
    private size: string
    private quantity: number
}

Atenção, todos os parâmetros acima, são recebidos no body em formato JSON.


#### Retornar pedidos

```
  GET /order
```

Atenção: Essa rota necessita de autenticação.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `startIn` | `number` | Começa a partir desse registro|

Atenção, todos parâmetros acima, são do tipo query, vindos da URL.

#### Retornar pedido pelo id

```
  GET /order/:id
```

Atenção: Essa rota necessita de autenticação.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `number` | Id do produto|

#### Avaliar produto

```
  POST /feedback
```

Atenção: Essa rota necessita de autenticação.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `rate` | `number` | Nota para o produto|
| `description` | `string` | Descrição para o produto|
| `productId` | `number` | Id do produto|

Atenção, todos os parâmetros acima, são recebidos no body em formato JSON.

#### Checar se o produto está avaliado

```
  GET /feedback/:id
```

Atenção: Essa rota necessita de autenticação.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `number` | Id do produto|


#### Retorna avaliações de um produto

```
  GET /feedback/rates/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `number` | Id do produto|
| `skip` | `number` | Pular registros|

Atenção, todos parâmetros acima (exceto id), são do tipo query, vindos da URL.


#### Envio de email para recuperação de senha 

```
  GET /recover-password
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email` | `string` | Email do usuário|

Atenção, todos parâmetros acima, são do tipo query, vindos da URL.

#### Recuperar Senha

```
  POST /:id/:token
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `string` | Id do usuário|
| `token` | `string` | Token para resetar|
| `password` | `string` | Nova senha|

Atenção, todos os parâmetros acima (exceto id e token), são recebidos no body em formato JSON.

## 🔗 Contato
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gustavo--aquino)

