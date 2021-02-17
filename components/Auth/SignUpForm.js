import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/authActions";
import MyTextInput from "../Utils/MyTextInput";
import { compose } from "redux";
import Loader from "../Utils/Loader";

function MyForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { authReducer } = props;

  const registerUserRequest = async (values) => {
    try {
      const response = await props.dispatch(createNewUser(values));
      if (response.success) {
        props.navigation.navigate("Dashboard");
      }
      if (!response.success) {
        throw response.responseBody;
      }
    } catch (error) {
      Alert.alert(
        "Registration Error",
        "User with this email already exists.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {authReducer.isLoading && <Loader />}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => props.navigation.navigate("Home")}
      >
        <Text style={styles.backButtonText}>X</Text>
      </TouchableOpacity>
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
  backButton: {
    backgroundColor: "green",
    borderRadius: 35,
    height: 35,
    width: 35,
    position: "absolute",
    top: 30,
    left: 20,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 11,
    paddingTop: 4,
  },
  button: {
    color: "green",
    borderColor: "#00cc00",
    borderWidth: 0.5,
    width: 300,
    textAlign: "center",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "500",
    color: "green",
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  input: {
    height: 40,
    borderRadius: 25,
    borderColor: "#00cc00",
    borderWidth: 0.5,
    backgroundColor: "white",
    marginBottom: 15,
    width: 300,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    color: "green",
    fontWeight: "bold",
    padding: 15,
  },
});

const validate = (values) => {
  const errors = {};
  const emailReg = /\S+@\S+\.\S+/;
  if (!values.username) {
    errors.username = "Username is required.";
  }
  if (!values.email || !emailReg.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.password || values.password.length < 8) {
    errors.password = "Passwords must be at least 8 characters long.";
  }
  if (
    !values.passwordConfirmation ||
    values.password !== values.passwordConfirmation
  ) {
    errors.passwordConfirmation = "Passwords do not match.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer.authReducer,
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
