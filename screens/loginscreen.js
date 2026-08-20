import { useState } from "react";

import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function avisar(titulo, mensagem) {
    if (Platform.OS === "web") alert(`${titulo}\n${mensagem}`);
    else Alert.alert(titulo, mensagem);
  }

  function entrar() {
    if (email.trim() === "" || senha.trim() === "") {
      avisar("Atenção", "Preencha e-mail e PIN.");
      return;
    }

    navigation.navigate("Dashboard", { email });
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        {/* CABEÇALHO */}
        <View style={styles.header}>

          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>SB</Text>
          </View>

          <Text style={styles.titulo}>
            SENAI <Text style={styles.tituloDestaque}>Bank</Text>
          </Text>

          <Text style={styles.subtitulo}>
            Bem-vindo de volta!
          </Text>

          <Text style={styles.descricao}>
            Entre na sua conta para continuar
          </Text>

        </View>

        {/* FORMULÁRIO */}
        <View style={styles.form}>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              E-mail
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#9A94A8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              PIN de acesso
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu PIN"
              placeholderTextColor="#9A94A8"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={entrar}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotao}>
              Entrar
            </Text>
          </TouchableOpacity>

        </View>

        {/* RODAPÉ */}
        <View style={styles.footer}>
          <Text style={styles.footerTexto}>
            SENAI BANK
          </Text>

          <Text style={styles.footerSubtexto}>
            Conta demonstrativa para fins educacionais
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F0FA",
    justifyContent: "center",
    padding: 24,
  },

  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },

  /* CABEÇALHO */

  header: {
    alignItems: "center",
    marginBottom: 32,
  },

  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 25,
    backgroundColor: "#7654D6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,

    shadowColor: "#7654D6",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 7,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
  },

  titulo: {
    color: "#28233A",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  tituloDestaque: {
    color: "#7654D6",
  },

  subtitulo: {
    color: "#39334B",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },

  descricao: {
    color: "#898296",
    fontSize: 12,
    marginTop: 5,
  },

  /* FORMULÁRIO */

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,

    shadowColor: "#33255E",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  inputGroup: {
    marginBottom: 17,
  },

  label: {
    color: "#403A51",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#F8F6FC",
    borderWidth: 1,
    borderColor: "#E4DEEF",
    borderRadius: 13,

    paddingHorizontal: 16,
    paddingVertical: 14,

    fontSize: 14,
    color: "#29243A",
  },

  botao: {
    backgroundColor: "#7654D6",

    paddingVertical: 15,
    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 3,

    shadowColor: "#7654D6",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  /* RODAPÉ */

  footer: {
    alignItems: "center",
    marginTop: 25,
  },

  footerTexto: {
    color: "#7654D6",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  footerSubtexto: {
    color: "#9A94A8",
    fontSize: 9,
    marginTop: 5,
  },
});