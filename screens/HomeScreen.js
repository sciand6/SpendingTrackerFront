import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/money.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Spending Tracker</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.registerButton}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.loginButton}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 80,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 120,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
