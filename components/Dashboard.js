import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

function Dashboard(props) {
  const { createUser } = props;

  useEffect(() => {
    if (!createUser.isLoggedIn) {
      props.navigation.navigate("Home");
    }
  });
  return (
    <View>
      <Text>Protected Route</Text>
      <TouchableOpacity onPress={() => props.dispatch(logoutUser())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser,
  createUser: state.authReducer.createUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
