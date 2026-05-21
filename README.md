# Challenge Sprint 2 📱

## 🖥️ Descrição do Frontend
A aplicação desenvolvida nessa sprint representa um sistema mobile de monitoramento de alertas industriais em um cenário de segurança baseado em visão computacional. O aplicativo foi desenvolvido utilizando React Native com Expo e TypeScript, simulando o funcionamento de um sistema de detecção de riscos em ambiente industrial.

O app permite visualizar alertas industriais, exibir informações relacionadas ao tipo de risco, setor afetado, nível de severidade, funcionários envolvidos e grupos notificados, além de permitir a criação de novos alertas diretamente pela interface utilizando estado local.

Por se tratar de uma aplicação frontend sem integração com backend, os dados utilizados no sistema são mockados através de arrays locais em TypeScript. Alguns dados dos alertas são gerados aleatoriamente, como nível de severidade, setor, tipo de risco e indivíduo sob risco, simulando diferentes situações industriais.

A proposta foi desenvolvida com React Native, Expo, TypeScript e componentes nativos do React Native, seguindo o padrão das aulas.

## 🗂️ Estrutura do Projeto
```
App.tsx
src/
├── components
│   └── AlertaCard.tsx
├── data
│   └── Alertas.ts
├── screens
│   └── AlertaScreen.tsx
└── types
    └── AlertaIndustrial.ts
```
## ⚙️ Como utilizar 

Para executar o programa, é necessário possuir o Node.js e o Expo instalado em uma IDE compatível (no meu caso utilizei o Visual Studio Code para isso). Para fazer a instalação inicial, primeiro é necessário fazer a instalação do conteúdo deste repositório. Após ter a pasta do projeto, basta abri-la na IDE escolhida e dentro da mesma abrir um terminal novo e digitar:
```
npm install

#APÓS A INSTALAÇÃO#

npx expo start
```
Após iniciar o projeto, a tecla "w" pode ser pressionada no terminal para o Expo executar o programa no navegador, ou então pode ser acessado diretamente após a execução pelo endereço: http://localhost:8081/

O aplicativo funciona totalmente com estado local e dados mockados, não utilizando integração com backend ou APIs externas, mas com capacidade completa de integração futura caso seja necessário.



Primeiramente

![A](images/1.png)

Após

![B](images/2.png)

Depois

![C](images/3.png)

Por fim

![D](images/4.png)

Os dados
