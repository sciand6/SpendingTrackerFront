import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import MyTextInput from "../Utils/MyTextInput";
import { compose } from "redux";
import Loader from "../Utils/Loader";

function MyForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { authReducer } = props;

  const changePasswordRequest = async (values) => {
    try {
      const response = await props.dispatch(
        changePassword(values, authReducer.token)
      );
      if (response.success) {
        Alert.alert(
          "Password Change Successful",
          "Your password was changed successfully.",
          [
            {
              text: "Ok",
              onPress: () => props.navigation.navigate("Dashboard"),
            },
          ]
        );
      }
      if (!response.success) {
        throw response.responseBody;
      }
    } catch (error) {
      Alert.alert(
        "Password Change Error",
        "Couldn't change your password. Did you enter your old password correctly?",
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
      <Text style={styles.title}>Change Password</Text>
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
        name={"oldPassword"}
        value={oldPassword}
        onChange={(text) => setOldPassword(text)}
        placeholder="Old Password"
        secureTextEntry={true}
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"password"}
        value={password}
        onChange={(text) => setPassword(text)}
        placeholder="New Password"
        secureTextEntry={true}
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"passwordConfirmation"}
        value={passwordConfirmation}
        onChange={(text) => setPasswordConfirmation(text)}
        placeholder="Confirm New Password"
        secureTextEntry={true}
        component={MyTextInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={props.handleSubmit(changePasswordRequest)}
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
  if (!values.oldPassword) {
    errors.oldPassword = "Please enter your old password.";
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
    form: "ChangePassword",
    validate,
  })
)(MyForm);
