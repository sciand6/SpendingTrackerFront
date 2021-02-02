import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import Loader from "../Utils/Loader";
import { connect } from "react-redux";
import { ForgotPassword } from "../../actions/authActions";
import MyTextInput from "../Utils/MyTextInput";
import { compose } from "redux";

function MyForm(props) {
  const [email, setEmail] = useState("");

  const { authReducer } = props;

  const forgotPasswordRequest = async (values) => {
    try {
      const response = await props.dispatch(ForgotPassword(values));
      if (response.success) {
        Alert.alert(
          "Reset Link Sent",
          "A link to reset your password has been sent to your email address.",
          [
            {
              text: "Ok",
              onPress: () => props.navigation.navigate("Home"),
            },
          ]
        );
      }
      if (!response.success) {
        throw response.responseBody;
      }
    } catch (error) {
      Alert.alert(
        "Password Reset Error",
        "There was a problem resetting your password.",
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
      <Text style={styles.title}>Forgot Password</Text>
      {authReducer.isLoading && <Loader />}
      <Field
        style={styles.input}
        name={"email"}
        value={email}
        onChange={(text) => setEmail(text)}
        placeholder="Email"
        component={MyTextInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={props.handleSubmit(forgotPasswordRequest)}
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
    borderRadius: 25,
    height: 40,
    width: 300,
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
  return errors;
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  authReducer: state.authReducer.authReducer,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "ForgotPassword",
    validate,
  })
)(MyForm);
