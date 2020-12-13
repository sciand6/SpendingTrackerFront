import React from "react";
import { Alert } from "react-native";
import SignUpForm from "../../components/SignUpForm";

export default function RegisterScreen() {
  return (
    <SignUpForm
      onSubmit={(values) => Alert.alert("Submitted!", JSON.stringify(values))}
    />
  );
}
