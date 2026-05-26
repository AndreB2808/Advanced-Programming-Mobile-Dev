import React, { useState } from "react";

import HomeScreen from "./src/screens/HomeScreen";
import AlertasScreen from "./src/screens/AlertaScreen";
import SensoresScreen from "./src/screens/SensorScreen";
import SistemasScreen from "./src/screens/SistemaScreen";

export default function App() {

  const [telaAtual, setTelaAtual] = useState("home");

  const navigation = {

    navigate: (tela: string) => {
      setTelaAtual(tela.toLowerCase());
    },

    goBack: () => {
      setTelaAtual("home");
    }
  };

  if (telaAtual === "alertas") {
    return <AlertasScreen navigation={navigation} />;
  }

  if (telaAtual === "sensores") {
    return <SensoresScreen navigation={navigation} />;
  }

  if (telaAtual === "sistemas") {
    return <SistemasScreen navigation={navigation} />;
  }

  return <HomeScreen navigation={navigation} />;
}