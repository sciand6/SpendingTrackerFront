import React, { useState, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createNewUser } from "../actions/authActions";
import MyTextInput from "./MyTextInput";
import { compose } from "redux";
import Loader from "./Loader";

function MyForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { authData, createUser } = props;

  // Error handling
  const registerUserRequest = async (values) => {
    try {
      const response = await props.dispatch(createNewUser(values));
      if (!response.success) {
        throw response.responseBody;
      }
    } catch (error) {
      Alert.alert("Login Error", error.msg, [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  useEffect(() => {
    if (authData.isLoggedIn) {
      props.navigation.navigate("Dashboard");
    }
  });
  return (
    <View style={styles.container}>
      {createUser.isLoading && <Loader />}
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
        onPress={props.handleSubmit(registerUserRequest)}
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
    backgroundColor: "#DDD",
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
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Passwords do not match.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
  createUser: state.authReducer.createUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "SignUp",
    validate,
  })
)(MyForm);
