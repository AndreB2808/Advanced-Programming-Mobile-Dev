# Global Solution - Space Connect 🚀

## 🖥️ Descrição
Projeto global solution, interface integrada com backend spring boot, guarda chamados de sistema, sensores e alertas, permite criar e visualizar chamados existentes, 

## 🗂️ Estrutura do Projeto
```
Advanced-Programming-Mobile-Dev/
├── Backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── GS1/
│   │       │       ├── controller/
│   │       │       │   ├── AlertaController.java
│   │       │       │   ├── SensorController.java
│   │       │       │   └── SistemaController.java
│   │       │       │
│   │       │       ├── model/
│   │       │       │   ├── Alerta.java
│   │       │       │   ├── Sensor.java
│   │       │       │   └── Sistema.java
│   │       │       │
│   │       │       ├── repository/
│   │       │       │   ├── AlertaRepository.java
│   │       │       │   ├── SensorRepository.java
│   │       │       │   └── SistemaRepository.java
│   │       │       │
│   │       │       ├── service/
│   │       │       │   ├── AlertaService.java
│   │       │       │   ├── SensorService.java
│   │       │       │   └── SistemaService.java
│   │       │       │
│   │       │       ├── config/
│   │       │       │   └── CorsConfig.java
│   │       │       │
│   │       │       └── Application.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   ├── data/
│   │   └── banco.mv.db
│   │
│   ├── pom.xml
│   └── mvnw
│
│
├── Frontend/
│
│   ├── assets/
│   │   └── background.png
│   │
│   ├── src/
│   │
│   │   ├── components/
│   │   │   ├── InfoCard.tsx
│   │   │   └── OptionChips.tsx
│   │   │
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── AlertasScreen.tsx
│   │   │   ├── SensoresScreen.tsx
│   │   │   └── SistemasScreen.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │   ├── Alerta.ts
│   │   │   ├── Sensor.ts
│   │   │   └── Sistema.ts
│   │   │
│   │   └── navigation/
│   │       └── AppNavigator.tsx
│   │
│   ├── App.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── node_modules/
│
└── README.md
```

![A](images/1.png)

![B](images/2.png)

![C](images/3.png)

André Bartolo Pellegrino dos Santos (558319)
Arthur Augutus Saraiva Pereira (555106)
