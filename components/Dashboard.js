import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

function Dashboard(props) {
  const { authData } = props;

  useEffect(() => {
    if (!authData.isLoggedIn) {
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
  authData: state.authReducer.authData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
