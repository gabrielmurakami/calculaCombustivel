import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
} from "react-native";

import logoBomb from "./src/assets/logo.png";
import logoGas from "./src/assets/gas.png";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const [valorAlcool, setValorAlcool] = useState();
  const [valorGasolina, setValorGasolina] = useState();

  const [result, setResult] = useState("");

  function closeKeyboard() {
    Keyboard.dismiss();
  }

  function showModal() {
    if (valorAlcool === "" || valorGasolina === "") {
      Alert.alert("Atenção!", "Verifique se você colocou todos os campos");
      return;
    }
    setModalVisible(true);
    calcula();
  }

  function calcula() {
    let varAl = valorAlcool;
    let varGas = valorGasolina;
    let calculado = varAl / varGas;
    console.log("Resultado foi: " + calculado);

    if (calculado < 0.7) {
      setResult("Álcool");
    } else {
      setResult("Gasolina");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.areaLogo}>
          <Image source={logoBomb} />
          <Text style={styles.title}>Qual melhor opção?</Text>
        </View>

        <View style={styles.areaInput}>
          <Text style={styles.text}>Álcool (preço por litro):</Text>
          <TextInput
            style={styles.input}
            placeholder="4,60"
            keyboardType="numeric"
            value={valorAlcool}
            onChangeText={(value) => setValorAlcool(value.replace(",", "."))}
          />
          <Text style={styles.text}>Gasolina (preço por litro):</Text>
          <TextInput
            style={styles.input}
            placeholder="7,30"
            keyboardType="numeric"
            value={valorGasolina}
            onChangeText={(value) => setValorGasolina(value.replace(",", "."))}
          />
          <TouchableOpacity style={styles.btn} onPress={showModal}>
            <Text style={styles.txtBtn}>Calcular</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModal(!modalVisible);
            }}
          >
            {/* Modal */}
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image source={logoGas} />
                <Text style={styles.modalText}>Compensa usar {result}</Text>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={[
                      styles.modalText,
                      { fontSize: 20, color: "white", marginBottom: 15 },
                    ]}
                  >
                    Com os preços:
                  </Text>
                  <Text style={styles.modalTextSub}>
                    Álcool: R$ {parseFloat(valorAlcool).toFixed(2)}
                  </Text>
                  <Text style={styles.modalTextSub}>
                    Gasolina: R$ {parseFloat(valorGasolina).toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalBtnVisible}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textModalBtnVisible}>
                    Calcular Novamente
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1212",
    alignItems: "center",
  },
  areaLogo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 25,
  },
  areaInput: {
    width: "90%",
    marginTop: 25,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginTop: 15,
    fontWeight: "bold",
  },
  input: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    fontSize: 20,
  },
  btn: {
    marginTop: 25,
    height: 45,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EC5800",
    borderRadius: 10,
  },
  txtBtn: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1212",
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  modalBtnVisible: {
    backgroundColor: "#1B1212",
    borderWidth: 1,
    borderColor: "#EC5800",
    borderRadius: 10,
    padding: 10,
    marginTop: 25,
  },
  textModalBtnVisible: {
    color: "#EC5800",
    paddingHorizontal: 10,
  },
  modalText: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "green",
  },
  modalTextSub: {
    color: "#fff",
    fontSize: 18,
    padding: 5,
  },
});
