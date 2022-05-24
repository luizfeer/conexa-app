# Front-end Conexa🏥
O app consiste em CRUD para agendamentos de Consultas.

O projeto utiliza os seguintes ferramentas no front-end:

 - [Quasar](https://quasar.dev/start/quasar-cli)
 - [Vue3](https://vuejs.org/guide/introduction.html)
 - [Pinia](https://pinia.vuejs.org/introduction.html)
 - [TailwindCSS](https://tailwindcss.com/)
 - [Vite](https://vitejs.dev/)
 - [Axios](https://axios-http.com/ptbr/docs/intro)

Pelo desafio, decidi utilizar Vue3 com Composition API, por ser atualmente um diferencial grande à v2. Para agilizar o desenvolvimento utilizei TailwindCSS, que na minha opinião é uma das melhores opções para um CSS rápido e organizado. Também pela agilidade costumo utilizar o Quasar pelos componentes, além de ser multiplataforma é superior ao Vuetify em suporte. Pinia faz todo sentido com Vue3 e Quasar, após o desuso do Vuex. Vite pra fechar o time com uma velocidade incrível no build.

Para rodar o frontend entre em ./frontend
```bash
npm i
..
npx quasar dev
```

Para o back entre em ./backend e rode:

```bash
npm i
...
npm run start
```

O servidor ficará disponível em:  http://localhost:3333.

### Deploy

Deploy do front-end: https://conexa-app.pages.dev/
`Ainda é necessário rodar o backend localmente, as requisições serão feitas em http://localhost:3333`

### Diferencial
Como diferencial ao cadastrar uma nova consulta é possível ver consultas já cadastradas do mesmo dia. Por isso o datapicker mantém em uma data específica, e não no dia atual, somente para demonstração de datas já agendadas no BD.


### Layout

[Figma](https://www.figma.com/file/eaD2LIOcswFJO2SblVyIeq/Desafio-frontend-Conexa?node-id=1%3A446)

### Credenciais para teste

email: gandalf@mail.com
senha: 123456
