import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

function AccountManagement(props) {
  return (
    <View style={styles.container}>
      <Button
        title="Change Password"
        onPress={() => props.navigation.navigate("ChangePassword")}
      />
      <Button title="Logout" onPress={() => props.dispatch(logoutUser())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(AccountManagement);
