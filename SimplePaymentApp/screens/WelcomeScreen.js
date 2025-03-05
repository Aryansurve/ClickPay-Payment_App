import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image source={require("../assets/clickpaylogo.png")} style={styles.logo} />
        <Text style={styles.title}>Click Pay</Text>
      </View>

      <View style={styles.lowerContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate("Signin")}> 
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Image source={require("../assets/google.png")} style={styles.googleIcon} />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.createAccountText}>
          Don't have an account?  
          <Text style={styles.createNow} onPress={() => navigation.navigate("Signup")}> Create Now</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F5F7FA", // Same as SignInScreen.js
    alignItems: "center", 
    justifyContent: "center",
    padding: 20,
  },
  upperContainer: { alignItems: "center", width: "100%", paddingVertical: 50 },
  logo: { width: 120, height: 120, resizeMode: "contain" },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#333", 
    marginTop: 10, 
    letterSpacing: 1 
  },

  lowerContainer: { width: "100%", alignItems: "center" },

  signInButton: {
    backgroundColor: "#1E3A8A", // Same deep blue as SignInScreen
    paddingVertical: 14,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  googleIcon: { width: 22, height: 22, marginRight: 10 },
  googleText: { fontSize: 16, color: "#333", fontWeight: "500" },

  createAccountText: { fontSize: 14, color: "#666", marginTop: 20 },
  createNow: { color: "#1E3A8A", fontWeight: "bold" },
});

export default WelcomeScreen;
