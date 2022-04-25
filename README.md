# Boas vindas ao repositório do projeto de Receitas!

# Habilidades

Nesse projeto, foi utilizado:

  -  _React_
  - _Redux_ para gerenciar estado
  - A biblioteca _React-Redux_
  - _React Hook useState_
  - _React Hook useContext_
  - _React Hook useEffect_
  - Metodologias ágeis _Kanban_ e _Scrum_
  - _Docker_

---

## O que foi desenvolvido

Um app de receitas que é possível ver, buscar, filtrar, favoritar e acompanhar o processo de preparação de receitas e drinks!

A base de dados são 2 APIs distintas, uma para comidas e outra para bebidas.

O layout tem como foco dispositivos móveis `(360x640 pixels)`, então todos os protótipos estão desenvolvidos em telas menores.

### Protótipo do projeto

Você pode acessar um protótipo no link abaixo:

[PROTÓTIPO NO FIGMA](https://www.figma.com/file/kGSTb4sfG0obitUISVz3O6/App-Receitas?node-id=0%3A1)

Para fins somente demonstrativos foi forçada a resolução de `364x640 `na aplicação para que fique similar ao dispositivo móvel.

Ao abrir a aplicação ela se apresentará dessa forma:
![exemplo-app](demonstra%C3%A7%C3%A3o-app.jpg)

---

# Intruções de execução

1. Clone o repositório
  * `git clone git@github.com:dihsantanna/recipes-app.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd recipes-app`

2. Caso não possua docker em sua máquina pule para o proximo passo
  * Execute aplicação com *Docker*:
    * `npm run compose:up` * pode demorar alguns minutos, varia de máquina para máquina
  * Inicialize o projeto acessando:
    * [http://localhost:3000/](http://localhost:3000/)

3. Rodando sem Docker
  * Instale as dependencias:
    * `npm install`
  * Inicialize a aplicação:
    * `npm start`

4. Interrompendo aplicação
  * Caso tenha utilizado o *Docker* execute o comando:
    * `npm run compose:down`
  * Caso não tenha utilizado o *Docker*:
    * Vá ao terminal onde a aplicação está sendo executada e pressione as teclas `ctrl+c`

## APIs

### TheMealDB API

O [TheMealDB](https://www.themealdb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas e ingredientes de todo o mundo.

Os end-points são bastante ricos, você pode [vê-los aqui](https://www.themealdb.com/api.php)

É possível listar todas as `categorias`, `áreas` e `ingredientes`:

```
categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
areas: https://www.themealdb.com/api/json/v1/1/list.php?a=list
ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list
```


### The CockTailDB API

Bem similar (inclusive mantida pela mesma entidade) a TheMealDB API, só que focado em bebidas.

Os end-points também são bastante ricos, você pode [vê-los aqui](https://www.thecocktaildb.com/api.php)

---

## Adições futuras
* Adicionar responsividade
* Adicionar persistência em banco de dados, construindo uma nova api para gerenciamento de usuários e suas receitas salvas.
* Refatoração para utilizar Redux-hooks.