import React, { useState, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { userLogin } from "../actions/authActions";
import MyTextInput from "./MyTextInput";
import { compose } from "redux";
import Loader from "./Loader";

function MyForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authData, loginUser } = props;

  // Error handling
  const loginUserRequest = async (values) => {
    try {
      const response = await props.dispatch(userLogin(values));
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
      {loginUser.isLoading && <Loader />}
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity
        style={styles.button}
        onPress={props.handleSubmit(loginUserRequest)}
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
  if (!values.email) {
    errors.email = "Email is required.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
  loginUser: state.authReducer.loginUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "Login",
    validate,
  })
)(MyForm);
