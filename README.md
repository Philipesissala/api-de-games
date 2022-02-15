# API de Games

Api construida no curso Formação nodejs do Victor Lima para praticar criação de Apis Rest e autenticação com JWT

## EndPoints

### GET /games

Endpoint responsável por retornar a listagem de todos os games cadastrados no banco de dados

#### Parametros

Nenhum

#### Respostas

##### OK! 200

Caso esta resposta aconteça você vai receber a listagem de todos os games
Exemplo de resposta:

```
[
  {
    "id": 1,
    "title": "Call of Duty 2",
    "year": 2011,
    "price": 1200,
    "createdAt": "2022-01-31T18:09:04.000Z",
    "updatedAt": "2022-02-08T08:51:45.000Z"
  },
  {
    "id": 2,
    "title": "Crash of Titans",
    "year": 2010,
    "price": 12000,
    "createdAt": "2022-01-31T18:09:11.000Z",
    "updatedAt": "2022-01-31T18:09:11.000Z"
  },
  {
    "id": 3,
    "title": "Pro Evolution Soccer 2022",
    "year": 2021,
    "price": 25000,
    "createdAt": "2022-02-08T08:53:00.000Z",
    "updatedAt": "2022-02-08T08:53:00.000Z"
  }
]
```

##### Falha na autentucação! 401

Caso esta resposta for rotornada significa que aconteceu alguma falha durante o processo de autenticação do usuário. Motivos: Token inválido, Token expirado.
Exemplo de resposta:

```
{
  "err": "Token inválido!"
}
```

### POST /auth

Endpoint responsável por fazer o processo de validação do usuário.

#### Parametros

email: E-mail do usuário cadastrado.
password: Senha do usuário cadastrado.

Exemplo:

```
{
	"email":"exemplo@gmail.com",
	"password":"12345"
}
```

#### Respostas

##### OK! 200

Caso esta resposta seja retornada você vai receber um token JWT para conseguir acessar endpoints protegidas na API.
Exemplo de resposta:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmaWxpcGVzaXNzYWxhMTRAZ21haWwuY29tIiwiaWF0IjoxNjQ0OTI5Nzk1LCJleHAiOjE2NDUxMDI1OTV9.cBTJVZbsxMf-4rPcHXWEnJOKJj-CIUXAUnhOxWmJGOQ"
}
```

##### Falha na autentucação! 401

Caso esta resposta for rotornada significa que aconteceu alguma falha durante o processo de autenticação do usuário. Motivos: Senha ou email incorreto.
Exemplo de resposta:

```
{
  "err": "Credenciais inválidas!"
}
```
