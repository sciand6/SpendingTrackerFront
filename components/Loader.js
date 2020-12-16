import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 99,
  },
});
