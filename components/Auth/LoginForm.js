import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { userLogin } from "../../actions/authActions";
import MyTextInput from "../Utils/MyTextInput";
import { compose } from "redux";
import Loader from "../Utils/Loader";

function MyForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authReducer } = props;

  const loginUserRequest = async (values) => {
    try {
      const response = await props.dispatch(userLogin(values));
      if (response.success) {
        props.navigation.navigate("Dashboard");
      }
      if (!response.success) {
        throw response.responseBody;
      }
    } catch (error) {
      Alert.alert("Login Error", "Invalid credentials.", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {authReducer.isLoading && <Loader />}
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
      <Button
        title="Forgot Password"
        onPress={() => props.navigation.navigate("ForgotPassword")}
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
    color: "green",
    borderColor: "#00cc00",
    borderWidth: 0.5,
    width: 300,
    textAlign: "center",
    borderRadius: 25,
    marginTop: 15,
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
  if (!values.email) {
    errors.email = "Email is required.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
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
    form: "Login",
    validate,
  })
)(MyForm);
