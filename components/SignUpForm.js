import React from "react";
import { reduxForm, Field } from "redux-form";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import MyTextInput from "./MyTextInput";

function MyForm(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Field
        style={styles.input}
        name={"username"}
        placeholder="Username"
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"email"}
        placeholder="Email"
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"password"}
        placeholder="Password"
        secureTextEntry={true}
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"passwordConfirmation"}
        secureTextEntry={true}
        placeholder="Password Confirmation"
        component={MyTextInput}
      />
      <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
        <Text style={styles.buttonText}>Submit!</Text>
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

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required.";
  }
  if (!values.email) {
    errors.email = "Email is required.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  }
  if (!values.password) {
    errors.passwordConfirmation = "Passwords do not match.";
  }
  return errors;
};

export default reduxForm({
  form: "SignUp",
  validate,
})(MyForm);
