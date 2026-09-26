# Challenge Sprint 4 [Frontend] 🏭

## 🖥️ Descrição do Projeto

A aplicação desenvolvida nessa sprint representa um sistema de monitoramento de alertas industriais em um cenário de segurança baseado em visão computacional. O backend desenvolvido com Spring Boot foi integrado ao frontend desenvolvido em React Native com Expo, permitindo que os alertas exibidos e criados no aplicativo sejam armazenados e consultados diretamente através da API.

O sistema permite listar alertas industriais, consultar um alerta específico por ID, cadastrar novos alertas e atualizar registros existentes, como ao marcar um alerta como resolvido. O backend foi desenvolvido utilizando Java 17, Spring Boot, Spring Web, Spring Data JPA, Maven e banco de dados H2 em modo file. Os dados permanecem armazenados mesmo após a reinicialização da aplicação. Além disso, o projeto possui um arquivo `data.sql` responsável pela criação dos dados iniciais utilizados para demonstração do sistema.

A principal entidade do sistema é a AlertaIndustrial, responsável por representar os alertas registrados, contendo informações como tipo de risco, descrição, setor, severidade, data e hora, indivíduos sob risco, grupos notificados e status de resolução.

## 🗂️ Estrutura do Frontend

```text
src/
├── components/
│   └── AlertaCard.tsx
├── screens/
│   └── AlertaScreen.tsx
├── services/
│   ├── api.ts
│   └── alertaService.ts
└── types/
    └── AlertaIndustrial.ts
```

## 🔗 Integração Backend e Frontend

Foi realizada a integração entre as duas aplicações executadas simultaneamente:

```text
Frontend Expo
http://localhost:8081
        ↓
      Axios
        ↓
Backend Spring Boot
http://localhost:8080
        ↓
       H2
```

O frontend não utiliza mais dados mockados como fonte dos alertas, e todas as informações exibidas são obtidas através da API do backend. O controller utiliza `@CrossOrigin` para permitir requisições realizadas pelo frontend executado em uma origem diferente. A tela AlertaScreen.tsx utiliza as funções de alertaService.ts, que por sua vez utiliza a configuração do Axios presente em api.ts para realizar as conexões aos endpoints da API.

```text
AlertaScreen.tsx
        ↓
alertaService.ts
        ↓
     api.ts
        ↓
Endpoints /alertas
```

Com as duas aplicações funcionando simultaneamente, o frontend deverá:

* listar os alertas armazenados no backend
* permitir o cadastro de novos alertas
* gerar automaticamente a data e o horário do cadastro
* criar novos alertas inicialmente como não resolvidos
* consultar os detalhes de um alerta através de seu ID
* permitir marcar um alerta como resolvido
* refletir as alterações realizadas diretamente no banco de dados

## ⚙️ Como iniciar o Backend

Para executar o backend, é necessário possuir instalado:

* Java 17 (Backend)
* Maven (Backend)
* Node.js (Frontend)
* Expo (Frontend)

O projeto pode ser aberto em uma IDE compatível com Java e Spring Boot, como Visual Studio Code ou IntelliJ IDEA.

Após isso, o backend pode ser iniciado executando o arquivo Java abaixo:

```text
Sprint1Application.java
```

Após a inicialização, o backend estará disponível em:

```text
http://localhost:8080
```

Os alertas podem ser visualizados diretamente pelo navegador através de:

```text
http://localhost:8080/alertas
```

## 📱 Como iniciar o Frontend

Para utilizar a integração completa, o frontend também deve estar em execução. Após baixar a branch correspondente ao frontend, execute dentro da pasta do projeto:

```bash
npm install
npx expo start
```

Após iniciar o Expo, pressione:

```text
w
```

para abrir a aplicação no navegador. Por padrão, o frontend estará disponível em:

```text
http://localhost:8081
```

O backend e o frontend devem permanecer executados simultaneamente durante o uso da aplicação.

## 📡 Endpoints da API

A API utiliza o endereço base:

```text
http://localhost:8080
```

Endpoints disponíveis:

```text
GET    /alertas
```

Lista todos os alertas armazenados no banco.

```text
GET    /alertas/{id}
```

Consulta os detalhes de um alerta específico através de seu ID.

```text
POST   /alertas
```

Cria um novo alerta.

```text
PUT    /alertas/{id}
```

Atualiza um alerta existente. No frontend, este endpoint é utilizado para marcar um alerta como resolvido.

```tex
DELETE /alertas/{id}
```

Remove um alerta existente.

### Exemplo de JSON

```json
{
  "tipoRisco": "EPI",
  "descricao": "Funcionário sem máscara anti-toxina",
  "setor": "PRODUÇÃO",
  "nivelSeveridade": "ALTO",
  "dataHora": "2026-04-24 19:32",
  "resolvido": false,
  "individuosSobRisco": "João Silva",
  "gruposNotificados": "Equipe de Segurança"
}
```

## 🗃️ Banco de Dados H2

O banco de dados pode ser acessado através de:

```text
http://localhost:8080/h2-console
```

As configurações de conexão estão localizadas no arquivo:

```text
src/main/resources/application.properties
```

O H2 utiliza persistência em modo file, permitindo que os registros sejam mantidos após a reinicialização da aplicação.

O arquivo:

```text
src/main/resources/data.sql
```

contém registros iniciais utilizados para demonstração do sistema.

## 📂 Camada `services` do Frontend

A comunicação entre o frontend e esta API é isolada através da pasta:

```text
src/services/
├── api.ts
└── alertaService.ts
```

O arquivo `api.ts` contém a configuração central do Axios, enquanto `alertaService.ts` contém as funções responsáveis pelas operações relacionadas aos alertas.

Dessa forma, as telas do aplicativo não utilizam Axios diretamente e não precisam montar URLs manualmente.

## 🌐 BASE_URL

No frontend, a URL do backend é configurada no arquivo:

```text
src/services/api.ts
```

Para execução pelo navegador utilizando Expo Web:

```text
http://localhost:8080
```

Dependendo da plataforma utilizada, o endereço deve ser alterado:

```text
Expo Web / iOS Simulator → http://localhost:8080

Android Emulator → http://10.0.2.2:8080

Dispositivo físico → http://IP-DA-MAQUINA:8080
```

## ⚠️ Troubleshooting

Caso o backend não esteja em execução ou não possa ser acessado, o frontend não utiliza dados mockados como alternativa.

Para fazer a verificação, mantenha o frontend em execução e interrompa o backend Spring Boot. Em seguida, recarregue a aplicação Expo. Como os dados são obtidos diretamente da API, os alertas não serão carregados e a aplicação exibirá uma mensagem de erro informando que não foi possível acessar os dados.

Para restabelecer o funcionamento da aplicação, basta iniciar novamente o backend em:

```text
http://localhost:8080
```
e recarregar a página do frontend.

A requisição é tratada através de `try/catch/finally` e a aplicação apresenta uma mensagem informando que não foi possível carregar ou realizar a operação solicitada. Dessa forma, fica claro para o usuário quando a comunicação com a API não está disponível.

Outros pontos que podem ser verificados caso a integração não funcione:

* Confirme se o backend está realmente sendo executado na porta 8080
* Confirme se o frontend Expo está em execução corretamente
* Verifique se a "BASE_URL" em "src/services/api.ts" corresponde ao ambiente utilizado
* No Expo Web ou iOS Simulator, utilize "http://localhost:8080", enquanto no Android Emulator utilize "http://10.0.2.2:8080"

## 🎥 Vídeo Youtube
https://youtu.be/uvEc-hQKZrI

## 🗂️ Repositórios

### Backend

https://github.com/AndreB2808/Advanced-Programming-Mobile-Dev/tree/sprint4BE

### Frontend

https://github.com/AndreB2808/Advanced-Programming-Mobile-Dev/tree/sprint4FE
