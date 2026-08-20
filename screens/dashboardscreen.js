import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DashboardScreen({
  route,
  navigation,
  saldo,
  receitas,
  despesas,
  movimentacoes,
}) {
  const email =
    route.params?.email || "estudante@senai.br";

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <ScrollView
      style={styles.background}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* CABEÇALHO */}

      <View style={styles.header}>
        <View>
          <Text style={styles.pequenoTitulo}>
            SENAI BANK
          </Text>

          <Text style={styles.titulo}>
            Minha conta
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            SB
          </Text>
        </View>
      </View>

      {/* SALDO */}

      <View style={styles.saldoCard}>
        <View>
          <Text style={styles.saldoLabel}>
            Saldo atual
          </Text>

          <Text style={styles.saldoValor}>
            {formatarMoeda(saldo)}
          </Text>
        </View>

        <View style={styles.saldoIcone}>
          <Text style={styles.saldoIconeTexto}>
            R$
          </Text>
        </View>
      </View>

      {/* RESUMO */}

      <View style={styles.resumo}>
        <View style={styles.resumoItem}>
          <View style={styles.receitaIcone}>
            <Text style={styles.iconeTexto}>
              ↑
            </Text>
          </View>

          <View>
            <Text style={styles.resumoLabel}>
              Receitas
            </Text>

            <Text style={styles.receitaValor}>
              {formatarMoeda(receitas)}
            </Text>
          </View>
        </View>

        <View style={styles.linhaVertical} />

        <View style={styles.resumoItem}>
          <View style={styles.despesaIcone}>
            <Text style={styles.iconeTexto}>
              ↓
            </Text>
          </View>

          <View>
            <Text style={styles.resumoLabel}>
              Despesas
            </Text>

            <Text style={styles.despesaValor}>
              {formatarMoeda(despesas)}
            </Text>
          </View>
        </View>
      </View>

      {/* CONTADOR */}

      <View style={styles.contador}>
        <View style={styles.contadorIcone}>
          <Text style={styles.contadorIconeTexto}>
            #
          </Text>
        </View>

        <View style={styles.contadorInfo}>
          <Text style={styles.contadorTitulo}>
            Movimentações realizadas
          </Text>

          <Text style={styles.contadorSubtitulo}>
            Total de operações registradas
          </Text>
        </View>

        <Text style={styles.contadorNumero}>
          {movimentacoes.length}
        </Text>
      </View>

      {/* BOTÃO NOVA MOVIMENTAÇÃO */}

      <TouchableOpacity
        style={styles.botaoNova}
        onPress={() =>
          navigation.navigate("Movimentacao")
        }
        activeOpacity={0.8}
      >
        <View style={styles.botaoIcone}>
          <Text style={styles.botaoIconeTexto}>
            +
          </Text>
        </View>

        <View style={styles.botaoInfo}>
          <Text style={styles.botaoTitulo}>
            Nova movimentação
          </Text>

          <Text style={styles.botaoSubtitulo}>
            Adicionar receita ou despesa
          </Text>
        </View>

        <Text style={styles.botaoSeta}>
          →
        </Text>
      </TouchableOpacity>

      {/* TÍTULO DO EXTRATO */}

      <View style={styles.extratoCabecalho}>
        <View>
          <Text style={styles.extratoTitulo}>
            Extrato
          </Text>

          <Text style={styles.extratoSubtitulo}>
            Movimentações recentes
          </Text>
        </View>

        <View style={styles.quantidade}>
          <Text style={styles.quantidadeTexto}>
            {movimentacoes.length}
          </Text>
        </View>
      </View>

      {/* EXTRATO */}

      <View style={styles.extrato}>
        {movimentacoes.length === 0 ? (
          <View style={styles.vazio}>
            <View style={styles.vazioIcone}>
              <Text style={styles.vazioIconeTexto}>
                $
              </Text>
            </View>

            <Text style={styles.vazioTitulo}>
              Nenhuma movimentação
            </Text>

            <Text style={styles.vazioTexto}>
              Cadastre uma receita ou despesa
              para visualizar aqui.
            </Text>
          </View>
        ) : (
          movimentacoes.map((movimento, index) => (
            <View
              key={movimento.id}
              style={[
                styles.movimento,
                index ===
                  movimentacoes.length - 1 &&
                  styles.ultimoMovimento,
              ]}
            >
              {/* ÍCONE */}

              <View
                style={[
                  styles.movimentoIcone,
                  movimento.tipo === "Receita"
                    ? styles.entrada
                    : styles.saida,
                ]}
              >
                <Text
                  style={[
                    styles.movimentoSeta,
                    movimento.tipo === "Receita"
                      ? styles.textoEntrada
                      : styles.textoSaida,
                  ]}
                >
                  {movimento.tipo === "Receita"
                    ? "↑"
                    : "↓"}
                </Text>
              </View>

              {/* INFORMAÇÕES */}

              <View style={styles.movimentoInfo}>
                <Text style={styles.movimentoNome}>
                  {movimento.descricao}
                </Text>

                <Text style={styles.movimentoCategoria}>
                  Categoria: {movimento.categoria}
                </Text>

                <Text style={styles.movimentoTipo}>
                  Tipo: {movimento.tipo}
                </Text>

                <Text style={styles.movimentoData}>
                  {movimento.data} • {movimento.hora}
                </Text>
              </View>

              {/* VALOR */}

              <Text
                style={[
                  styles.movimentoValor,
                  movimento.tipo === "Receita"
                    ? styles.valorEntrada
                    : styles.valorSaida,
                ]}
              >
                {movimento.tipo === "Receita"
                  ? "+"
                  : "-"}{" "}
                {formatarMoeda(movimento.valor)}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* SAIR */}

      <TouchableOpacity
        style={styles.sair}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.sairTexto}>
          Sair da conta
        </Text>
      </TouchableOpacity>

      <Text style={styles.rodape}>
        SENAI BANK • Sistema demonstrativo
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F4F1FA",
  },

  container: {
    padding: 20,
    paddingBottom: 35,
  },

  /* CABEÇALHO */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  pequenoTitulo: {
    color: "#7357D9",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  titulo: {
    color: "#211D35",
    fontSize: 27,
    fontWeight: "800",
  },

  email: {
    color: "#817B91",
    fontSize: 11,
    marginTop: 4,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#7357D9",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarTexto: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  /* SALDO */

  saldoCard: {
    backgroundColor: "#7357D9",
    borderRadius: 23,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  saldoLabel: {
    color: "#DDD5FF",
    fontSize: 12,
    fontWeight: "600",
  },

  saldoValor: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },

  saldoIcone: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "#846BE5",
    justifyContent: "center",
    alignItems: "center",
  },

  saldoIconeTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  /* RESUMO */

  resumo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    elevation: 2,
  },

  resumoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  linhaVertical: {
    width: 1,
    height: 40,
    backgroundColor: "#E7E3EE",
    marginHorizontal: 10,
  },

  receitaIcone: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#E3F7EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  despesaIcone: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#FCE5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  iconeTexto: {
    fontSize: 20,
    fontWeight: "bold",
  },

  resumoLabel: {
    color: "#898395",
    fontSize: 10,
  },

  receitaValor: {
    color: "#15945B",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 3,
  },

  despesaValor: {
    color: "#D84059",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 3,
  },

  /* CONTADOR */

  contador: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    elevation: 1,
  },

  contadorIcone: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#EEE9FF",
    justifyContent: "center",
    alignItems: "center",
  },

  contadorIconeTexto: {
    color: "#7357D9",
    fontSize: 21,
    fontWeight: "800",
  },

  contadorInfo: {
    flex: 1,
    marginLeft: 11,
  },

  contadorTitulo: {
    color: "#282337",
    fontSize: 12,
    fontWeight: "800",
  },

  contadorSubtitulo: {
    color: "#9993A5",
    fontSize: 9,
    marginTop: 4,
  },

  contadorNumero: {
    color: "#7357D9",
    fontSize: 25,
    fontWeight: "900",
  },

  /* BOTÃO */

  botaoNova: {
    backgroundColor: "#211D35",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  botaoIcone: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#7357D9",
    justifyContent: "center",
    alignItems: "center",
  },

  botaoIconeTexto: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "300",
  },

  botaoInfo: {
    flex: 1,
    marginLeft: 12,
  },

  botaoTitulo: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  botaoSubtitulo: {
    color: "#AAA4B7",
    fontSize: 9,
    marginTop: 4,
  },

  botaoSeta: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 8,
  },

  /* EXTRATO */

  extratoCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  extratoTitulo: {
    color: "#211D35",
    fontSize: 20,
    fontWeight: "800",
  },

  extratoSubtitulo: {
    color: "#898395",
    fontSize: 10,
    marginTop: 3,
  },

  quantidade: {
    backgroundColor: "#E9E4FF",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 15,
  },

  quantidadeTexto: {
    color: "#7357D9",
    fontSize: 11,
    fontWeight: "800",
  },

  extrato: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    elevation: 2,
    marginBottom: 20,
  },

  movimento: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEAF2",
  },

  ultimoMovimento: {
    borderBottomWidth: 0,
  },

  movimentoIcone: {
    width: 43,
    height: 43,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  entrada: {
    backgroundColor: "#E3F7EC",
  },

  saida: {
    backgroundColor: "#FCE5E9",
  },

  movimentoSeta: {
    fontSize: 21,
    fontWeight: "bold",
  },

  textoEntrada: {
    color: "#15945B",
  },

  textoSaida: {
    color: "#D84059",
  },

  movimentoInfo: {
    flex: 1,
    marginLeft: 11,
    marginRight: 5,
  },

  movimentoNome: {
    color: "#272235",
    fontSize: 12,
    fontWeight: "800",
  },

  movimentoCategoria: {
    color: "#777184",
    fontSize: 9,
    marginTop: 4,
  },

  movimentoTipo: {
    color: "#9892A1",
    fontSize: 9,
    marginTop: 2,
  },

  movimentoData: {
    color: "#AAA5B2",
    fontSize: 8,
    marginTop: 3,
  },

  movimentoValor: {
    fontSize: 10,
    fontWeight: "900",
  },

  valorEntrada: {
    color: "#15945B",
  },

  valorSaida: {
    color: "#D84059",
  },

  /* VAZIO */

  vazio: {
    alignItems: "center",
    paddingVertical: 35,
  },

  vazioIcone: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "#EEE9FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  vazioIconeTexto: {
    color: "#7357D9",
    fontSize: 23,
    fontWeight: "800",
  },

  vazioTitulo: {
    color: "#282337",
    fontSize: 14,
    fontWeight: "800",
  },

  vazioTexto: {
    color: "#9993A5",
    fontSize: 10,
    textAlign: "center",
    marginTop: 5,
    maxWidth: 230,
    lineHeight: 15,
  },

  /* SAIR */

  sair: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DED9E7",
    paddingVertical: 14,
    borderRadius: 14,
  },

  sairTexto: {
    color: "#665F73",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
  },

  rodape: {
    color: "#AAA5B2",
    textAlign: "center",
    fontSize: 8,
    marginTop: 14,
  },
});