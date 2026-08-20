import React, { useState } from "react";
import { Alert, Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/loginscreen";
import DashboardScreen from "./screens/dashboardscreen";
import MovimentacaoScreen from "./screens/MovementScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [movimentacoes, setMovimentacoes] = useState([]);

  function avisar(titulo, mensagem) {
    if (Platform.OS === "web") {
      alert(`${titulo}\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  function adicionarMovimentacao(dados) {
    const valor = Number(dados.valor);

    if (!Number.isFinite(valor) || valor <= 0) {
      return {
        sucesso: false,
        mensagem: "Digite um valor válido maior que zero.",
      };
    }

    if (dados.tipo === "Despesa" && valor > saldo) {
      return {
        sucesso: false,
        mensagem:
          "Saldo insuficiente para realizar esta despesa.",
      };
    }

    const agora = new Date();

    const data = agora.toLocaleDateString("pt-BR");

    const hora = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const novaMovimentacao = {
      id: Date.now(),
      descricao: dados.descricao,
      valor: valor,
      tipo: dados.tipo,
      categoria: dados.categoria,
      data: data,
      hora: hora,
    };

    setMovimentacoes((listaAtual) => [
      novaMovimentacao,
      ...listaAtual,
    ]);

    if (dados.tipo === "Receita") {
      setSaldo((saldoAtual) => saldoAtual + valor);
      setReceitas((valorAtual) => valorAtual + valor);
    } else {
      setSaldo((saldoAtual) => saldoAtual - valor);
      setDespesas((valorAtual) => valorAtual + valor);
    }

    return {
      sucesso: true,
    };
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#17152B",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "SENAI Bank",
          }}
        />

        <Stack.Screen
          name="Dashboard"
          options={{
            title: "Minha Conta",
          }}
        >
          {(props) => (
            <DashboardScreen
              {...props}
              saldo={saldo}
              receitas={receitas}
              despesas={despesas}
              movimentacoes={movimentacoes}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Movimentacao"
          options={{
            title: "Nova Movimentação",
          }}
        >
          {(props) => (
            <MovimentacaoScreen
              {...props}
              saldo={saldo}
              adicionarMovimentacao={adicionarMovimentacao}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}