import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Field, reduxForm } from "redux-form";

const renderInput = ({
  placeholder,
  secureTextEntry,
  input: { onChange, ...restInput },
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      {...restInput}
    />
  );
};

const submit = (fields) => {
  console.log(fields);
};

function RegisterScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View>
        <Field name="username" component={renderInput} placeholder="Username" />
        <Field name="email" component={renderInput} placeholder="Email" />
        <Field
          name="password"
          component={renderInput}
          secureTextEntry={true}
          placeholder="Password"
        />
        <Field
          name="passwordConfirmation"
          component={renderInput}
          secureTextEntry={true}
          placeholder="Password Confirmation"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={props.handleSubmit(submit)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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

export default reduxForm({
  form: "register",
})(RegisterScreen);
