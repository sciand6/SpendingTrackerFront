import "react-native-gesture-handler";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import DashboardScreen from "./screens/Auth/DashboardScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

const Stack = createStackNavigator();

function Main(props) {
  const { createUser, loginUser } = props;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          createUser.isLoggedIn || loginUser.isLoggedIn ? "Dashboard" : "Home"
        }
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  createUser: state.authReducer.createUser,
  loginUser: state.authReducer.loginUser,
});

export default connect(mapStateToProps, null)(Main);
