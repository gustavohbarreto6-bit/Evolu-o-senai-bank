SENAI Bank 💰

Aplicativo bancário desenvolvido em React Native como parte do projeto integrador do SENAI. O projeto permite cadastrar receitas e despesas, controlar o saldo, categorizar movimentações, impedir despesas acima do saldo disponível e visualizar o extrato diretamente no Dashboard.

📱 Funcionalidades
Login no aplicativo
Cadastro de receitas
Cadastro de despesas
Seleção de categorias
Cálculo automático do saldo
Cálculo automático de receitas
Cálculo automático de despesas
Contador de movimentações
Validação para impedir saldo negativo
Botão para limpar os campos
Extrato integrado ao Dashboard
Exibição de data e hora das movimentações
Formatação dos valores em Real brasileiro (R$)
🏷️ Categorias

As movimentações podem receber uma das seguintes categorias:

Alimentação
Transporte
Educação
Salário
Lazer
Outros
💰 Regra de saldo

O aplicativo não permite cadastrar uma despesa maior que o saldo disponível.

Por exemplo:

Saldo disponível: R$ 1.300,00
Despesa: R$ 2.000,00

Nesse caso, a operação é cancelada e o usuário recebe a mensagem:

Operação não permitida!


Saldo insuficiente para realizar esta despesa.

A movimentação não é adicionada ao extrato.

🧹 Limpar campos

O botão LIMPAR CAMPOS apaga:

Descrição
Valor
Tipo
Categoria

A limpeza não cria nenhuma movimentação.

📊 Dashboard

O Dashboard apresenta automaticamente:

Saldo atual
R$ 1.300,00


Receitas
R$ 1.500,00


Despesas
R$ 200,00


Movimentações realizadas
2

Os valores são atualizados sempre que uma nova movimentação válida é cadastrada.

📄 Extrato

O extrato fica dentro do próprio Dashboard e apresenta:

Material escolar


Categoria: Educação
Tipo: Despesa
Data: 20/08/2026 08:30


- R$ 200,00

Para receitas, o aplicativo utiliza o sinal +:

Bolsa auxílio


Categoria: Salário
Tipo: Receita
Data: 20/08/2026 09:15


+ R$ 1.500,00
🗂️ Estrutura do projeto
SENAI Bank
│
├── App.js
│
└── screens
    ├── LoginScreen.js
    ├── DashboardScreen.js
    └── MovementScreen.js

Nesta versão não é utilizado BankContext.js e não existe uma tela separada para o extrato. O extrato é apresentado diretamente no DashboardScreen.js.

🛠️ Tecnologias utilizadas
React Native
Expo
JavaScript
React Navigation
useState
navigation.navigate()
navigation.goBack()
Alert
ScrollView
TouchableOpacity
TextInput
▶️ Como executar
1. Instalar as dependências

No terminal do projeto:

npm install
2. Instalar o React Navigation
npm install @react-navigation/native
npm install @react-navigation/native-stack

Para o Expo:

npx expo install react-native-screens react-native-safe-area-context
3. Iniciar o projeto
npx expo start

Depois, escolha uma das opções:

a → Android
w → navegador
Escanear o QR Code → Expo Go
🧪 Testes obrigatórios
Teste 1 — Receita

Cadastrar:

Descrição: Bolsa auxílio
Valor: R$ 1.500,00
Tipo: Receita
Categoria: Salário

Resultado esperado:

Saldo: R$ 1.500,00
Receitas: R$ 1.500,00
Despesas: R$ 0,00
Movimentações: 1
Teste 2 — Despesa válida

Cadastrar:

Descrição: Material escolar
Valor: R$ 200,00
Tipo: Despesa
Categoria: Educação

Resultado esperado:

Saldo: R$ 1.300,00
Receitas: R$ 1.500,00
Despesas: R$ 200,00
Movimentações: 2
Teste 3 — Saldo insuficiente

Tentar cadastrar:

Despesa: R$ 2.000,00

Resultado esperado:

Operação não permitida!
Saldo insuficiente para realizar esta despesa.

O saldo deve continuar:

R$ 1.300,00

E o contador deve continuar:

2
Teste 4 — Limpar campos

Preencher descrição, valor, tipo e categoria.

Pressionar:

LIMPAR CAMPOS

Resultado esperado:

Descrição: vazia
Valor: vazio
Tipo: Receita
Categoria: vazia

Nenhuma movimentação deve ser criada.

Teste 5 — Extrato

Após os testes anteriores, somente estas duas movimentações devem aparecer:

Bolsa auxílio
Categoria: Salário
Tipo: Receita
+ R$ 1.500,00


Material escolar
Categoria: Educação
Tipo: Despesa
- R$ 200,00
🧠 Conceitos utilizados
useState

É utilizado para armazenar informações que podem mudar durante a execução do aplicativo.

Exemplo:

const [movements, setMovements] = useState([]);
setMovements

É utilizado para atualizar a lista de movimentações:

setMovements((oldMovements) => [
  ...oldMovements,
  newMovement,
]);
addMovement

Função responsável por adicionar uma nova movimentação à lista.

Number.isFinite

Utilizado para verificar se o valor informado é um número válido.

if

Utilizado para criar as regras de validação, como verificar se o saldo é suficiente.

return

Interrompe a função quando uma regra não é atendida.

Exemplo:

if (type === "Despesa" && value > balance) {
  Alert.alert(
    "Operação não permitida!",
    "Saldo insuficiente para realizar esta despesa."
  );


  return;
}
navigation.navigate()

Utilizado para navegar para outra tela:

navigation.navigate("Movimentacao");
navigation.goBack()

Utilizado para retornar à tela anterior:

navigation.goBack();
👥 Divisão do trabalho
Estudante A
Formulário de movimentações
Categorias
Validação de saldo
Botão limpar campos
Estudante B
Dashboard
Cálculo de saldo
Contador de movimentações
Extrato

Os dois estudantes devem compreender todas as partes do código para conseguir explicar a implementação durante a apresentação.

🎯 Resultado esperado

O aplicativo deve permitir o seguinte fluxo:

Login
   ↓
Dashboard
   ↓
Nova Movimentação
   ↓
Cadastrar Receita
   ↓
Salvar
   ↓
Atualizar saldo
   ↓
Atualizar receitas
   ↓
Atualizar contador
   ↓
Atualizar extrato

Para uma despesa:

Nova Movimentação
   ↓
Cadastrar Despesa
   ↓
Verificar saldo
   ↓
Saldo suficiente?
   ├── SIM → Salvar movimentação
   │          ↓
   │       Atualizar saldo
   │          ↓
   │       Atualizar despesas
   │          ↓
   │       Atualizar contador
   │          ↓
   │       Atualizar extrato
   │
   └── NÃO → Exibir alerta
              ↓
           Cancelar operação
🎓 Objetivo do projeto

O objetivo do SENAI Bank é desenvolver conhecimentos de estados, componentes, navegação, validações, manipulação de listas e regras de negócio no React Native, evoluindo uma aplicação existente sem prejudicar suas funcionalidades anteriores.
