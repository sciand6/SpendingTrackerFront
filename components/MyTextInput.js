import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

export default function MyTextInput(props) {
  const {
    input,
    meta: { touched, error },
    ...inputProps
  } = props;

  return (
    <View>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
      {touched && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
