import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: "green",
    borderRadius: 5,
    height: 50,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
  },
  container: {
    flex: 1,
    backgroundColor: "#85bb65",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  input: {
    height: 40,
    borderRadius: 25,
    backgroundColor: "white",
    marginTop: 15,
    width: 300,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    padding: 15,
  },
});
