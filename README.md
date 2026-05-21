# Challenge Sprint 2 📱

## 🖥️ Descrição do Frontend
A aplicação desenvolvida nessa sprint representa um sistema mobile de monitoramento de alertas industriais em um cenário de segurança baseado em visão computacional. O aplicativo foi desenvolvido utilizando React Native com Expo e TypeScript, seguindo o padrão das aulas,  simulando o funcionamento de um sistema de detecção de riscos em ambiente industrial.

O programa permite visualizar alertas industriais, e dentro desses alertas exibir informações relacionadas ao tipo de risco, setor afetado, nível de severidade, funcionários / pessoas envolvidas e grupos notificados pelo alerta, além de permitir a criação de novos alertas diretamente pela interface utilizando estado local.

Por se tratar de uma aplicação frontend sem integração com backend, os dados utilizados no sistema são mockados através de arquivos locais em TypeScript. Os dados dos alertas são gerados aleatoriamente (exceto a descrição que é inserida pelo usuário), simulando diferentes situações industriais.

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

Para executar o programa, é necessário possuir o Node.js e o Expo instalado via uma IDE compatível (no meu caso utilizei o Visual Studio Code para isso). Para fazer a instalação inicial, primeiro é necessário fazer a instalação do conteúdo deste repositório. Após ter a pasta do projeto, basta abri-la na IDE escolhida e dentro da mesma abrir um terminal novo e digitar:
```
npm install

#APÓS A INSTALAÇÃO#

npx expo start
```
Após iniciar o projeto, a tecla "w" pode ser pressionada no terminal para o Expo executar o programa no navegador, ou então pode ser acessado diretamente após a execução pelo endereço: http://localhost:8081/

O aplicativo funciona totalmente com estado local e dados mockados, não utilizando integração com backend ou APIs externas, mas com capacidade de integração futura caso seja necessário.

Ao abrir a página Web, é apresentado 4 exemplos de alertas já criados.

![A](images/1.png)

Clicando na barra de texto é possível inserir uma descrição de algum alerta a ser gerado, e após clicar no botão "ADICIONAR ALERTA", é criado o alerta utilizando a descrição fornecida.

![B](images/2.png)

![C](images/3.png)

Para fins de simplificação, os dados do alerta criado são aleatoriamente pré-definidos, com apenas a descrição sendo inserida pelo usuário.

Vídeo de demonstração da instalação, inicialização e usagem:

https://github.com/user-attachments/assets/fb63081b-23bb-453a-9889-7876906cfc67
