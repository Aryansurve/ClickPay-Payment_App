import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNext = () => {
    const formattedNumber = `+91${phoneNumber}`.replace(/\s+/g, "").trim();
    navigation.navigate("Signup", { phoneNumber: formattedNumber });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image source={require("../assets/clickpaylogo.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome to ClickPay</Text>
        <Text style={styles.subtitle}>Enter your phone number to continue</Text>

        <View style={styles.phoneContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text.replace(/\D/g, ""));
            }}
            keyboardType="number-pad"
            maxLength={15}
            editable={true}
            selectTextOnFocus={true}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: phoneNumber.length >= 10 ? "#007BFF" : "#ccc" }]}
          onPress={handleNext}
          disabled={phoneNumber.length < 10}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", alignItems: "center", justifyContent: "center", padding: 20 },
  logo: { width: 100, height: 100, resizeMode: "contain", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
  phoneContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 10, padding: 10, marginBottom: 20 },
  countryCode: { fontSize: 16, fontWeight: "bold", marginRight: 10, color: "#333" },
  phoneInput: { flex: 1, fontSize: 16, color: "#333", paddingVertical: 8, paddingHorizontal: 10 },
  button: { width: "100%", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});

export default LoginScreen;
