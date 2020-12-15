import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createNewUser } from "../actions/authActions";
import MyTextInput from "./MyTextInput";
import { compose } from "redux";

function MyForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Field
        style={styles.input}
        name={"username"}
        value={username}
        onChange={(text) => setUsername(text)}
        placeholder="Username"
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"email"}
        value={email}
        onChange={(text) => setEmail(text)}
        placeholder="Email"
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"password"}
        value={password}
        onChange={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"passwordConfirmation"}
        value={passwordConfirmation}
        onChange={(text) => setPasswordConfirmation(text)}
        secureTextEntry={true}
        placeholder="Password Confirmation"
        component={MyTextInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={props.handleSubmit((values) =>
          props.dispatch(createNewUser(values))
        )}
      >
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

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: "SignUp",
    validate,
  })
)(MyForm);
