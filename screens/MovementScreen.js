import React, { useState } from "react";

import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MovimentacaoScreen({
  navigation,
  saldo,
  adicionarMovimentacao,
}) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("Receita");
  const [categoria, setCategoria] = useState("");

  const categorias = [
    "Alimentação",
    "Transporte",
    "Educação",
    "Salário",
    "Lazer",
    "Outros",
  ];

  function avisar(titulo, mensagem) {
    if (Platform.OS === "web") {
      alert(`${titulo}\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  function limparCampos() {
    setDescricao("");
    setValor("");
    setTipo("Receita");
    setCategoria("");
  }

  function salvarMovimentacao() {
    if (descricao.trim() === "") {
      avisar("Atenção", "Preencha a descrição.");
      return;
    }

    if (valor.trim() === "") {
      avisar("Atenção", "Preencha o valor.");
      return;
    }

    if (categoria === "") {
      avisar("Atenção", "Selecione uma categoria.");
      return;
    }

    const valorNumerico = Number(
      valor.replace(",", ".")
    );

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      avisar(
        "Atenção",
        "Digite um valor válido maior que zero."
      );
      return;
    }

    if (
      tipo === "Despesa" &&
      valorNumerico > saldo
    ) {
      avisar(
        "Operação não permitida!",
        "Saldo insuficiente para realizar esta despesa."
      );
      return;
    }

    const resultado = adicionarMovimentacao({
      descricao: descricao.trim(),
      valor: valorNumerico,
      tipo: tipo,
      categoria: categoria,
    });

    if (!resultado.sucesso) {
      avisar(
        "Operação não permitida!",
        resultado.mensagem
      );
      return;
    }

    avisar(
      "Tudo certo!",
      "Movimentação cadastrada com sucesso."
    );

    limparCampos();

    navigation.goBack();
  }

  return (
    <ScrollView
      style={styles.background}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topo}>
        <Text style={styles.titulo}>
          Nova movimentação
        </Text>

        <Text style={styles.subtitulo}>
          Adicione uma receita ou despesa à sua conta
        </Text>
      </View>

      {/* SALDO */}

      <View style={styles.saldoCard}>
        <View>
          <Text style={styles.saldoLabel}>
            Saldo disponível
          </Text>

          <Text style={styles.saldoValor}>
            {saldo.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>

        <View style={styles.saldoIcone}>
          <Text style={styles.saldoIconeTexto}>
            R$
          </Text>
        </View>
      </View>

      {/* DESCRIÇÃO */}

      <View style={styles.grupo}>
        <Text style={styles.label}>
          Descrição
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: Material escolar"
          placeholderTextColor="#77728E"
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      {/* VALOR */}

      <View style={styles.grupo}>
        <Text style={styles.label}>
          Valor
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: 120,00"
          placeholderTextColor="#77728E"
          value={valor}
          onChangeText={setValor}
          keyboardType="decimal-pad"
        />
      </View>

      {/* TIPO */}

      <View style={styles.grupo}>
        <Text style={styles.label}>
          Tipo de movimentação
        </Text>

        <View style={styles.tipos}>
          <TouchableOpacity
            style={[
              styles.tipoBotao,
              tipo === "Receita" &&
                styles.receitaSelecionada,
            ]}
            onPress={() => setTipo("Receita")}
          >
            <Text style={styles.tipoIcone}>
              ↑
            </Text>

            <Text
              style={[
                styles.tipoTexto,
                tipo === "Receita" &&
                  styles.tipoTextoSelecionado,
              ]}
            >
              Receita
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tipoBotao,
              tipo === "Despesa" &&
                styles.despesaSelecionada,
            ]}
            onPress={() => setTipo("Despesa")}
          >
            <Text style={styles.tipoIcone}>
              ↓
            </Text>

            <Text
              style={[
                styles.tipoTexto,
                tipo === "Despesa" &&
                  styles.tipoTextoSelecionado,
              ]}
            >
              Despesa
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CATEGORIA */}

      <View style={styles.grupo}>
        <Text style={styles.label}>
          Categoria
        </Text>

        <View style={styles.categorias}>
          {categorias.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoria,
                categoria === item &&
                  styles.categoriaSelecionada,
              ]}
              onPress={() => setCategoria(item)}
            >
              <Text
                style={[
                  styles.categoriaTexto,
                  categoria === item &&
                    styles.categoriaTextoSelecionado,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* SALVAR */}

      <TouchableOpacity
        style={styles.salvar}
        onPress={salvarMovimentacao}
        activeOpacity={0.8}
      >
        <Text style={styles.salvarTexto}>
          SALVAR MOVIMENTAÇÃO
        </Text>
      </TouchableOpacity>

      {/* LIMPAR */}

      <TouchableOpacity
        style={styles.limpar}
        onPress={limparCampos}
        activeOpacity={0.8}
      >
        <Text style={styles.limparTexto}>
          LIMPAR CAMPOS
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0E0C1B",
  },

  container: {
    padding: 22,
    paddingBottom: 40,
  },

  topo: {
    marginBottom: 25,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },

  subtitulo: {
    color: "#89839F",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },

  saldoCard: {
    backgroundColor: "#1A1730",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
    borderWidth: 1,
    borderColor: "#302B50",
  },

  saldoLabel: {
    color: "#8F89A8",
    fontSize: 12,
  },

  saldoValor: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 5,
  },

  saldoIcone: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#6C4DFF",
    justifyContent: "center",
    alignItems: "center",
  },

  saldoIconeTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  grupo: {
    marginBottom: 23,
  },

  label: {
    color: "#E8E5F2",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 9,
  },

  input: {
    backgroundColor: "#18152A",
    borderWidth: 1,
    borderColor: "#302B50",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: "#FFFFFF",
    fontSize: 15,
  },

  tipos: {
    flexDirection: "row",
    gap: 12,
  },

  tipoBotao: {
    flex: 1,
    backgroundColor: "#18152A",
    borderWidth: 1,
    borderColor: "#302B50",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
  },

  receitaSelecionada: {
    backgroundColor: "#153D2C",
    borderColor: "#27D17F",
  },

  despesaSelecionada: {
    backgroundColor: "#401D2B",
    borderColor: "#FF5570",
  },

  tipoIcone: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 3,
  },

  tipoTexto: {
    color: "#817B98",
    fontSize: 13,
    fontWeight: "700",
  },

  tipoTextoSelecionado: {
    color: "#FFFFFF",
  },

  categorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  categoria: {
    backgroundColor: "#18152A",
    borderWidth: 1,
    borderColor: "#302B50",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  categoriaSelecionada: {
    backgroundColor: "#6C4DFF",
    borderColor: "#6C4DFF",
  },

  categoriaTexto: {
    color: "#8D87A3",
    fontSize: 12,
    fontWeight: "600",
  },

  categoriaTextoSelecionado: {
    color: "#FFFFFF",
  },

  salvar: {
    backgroundColor: "#6C4DFF",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 4,
  },

  salvarTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  limpar: {
    backgroundColor: "#18152A",
    borderWidth: 1,
    borderColor: "#393451",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 12,
  },

  limparTexto: {
    color: "#C5C0D4",
    fontSize: 14,
    fontWeight: "700",
  },
});
