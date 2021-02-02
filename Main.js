import "react-native-gesture-handler";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import DashboardScreen from "./screens/Home/DashboardScreen";
import CreateExpenseScreen from "./screens/Home/Expenses/CreateExpenseScreen";
import EditExpenseScreen from "./screens/Home/Expenses/EditExpenseScreen";
import ExpenseReportScreen from "./screens/Home/Expenses/ExpenseReportScreen";
import ExpenseListScreen from "./screens/Home/Expenses/ExpenseListScreen";
import AccountManagementScreen from "./screens/Auth/AccountMangementScreen";
import ChangePasswordScreen from "./screens/Auth/ChangePasswordScreen";
import DeleteAccountScreen from "./screens/Auth/DeleteAccountScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

const Stack = createStackNavigator();

function Main(props) {
  const { authReducer } = props;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authReducer.isLoggedIn ? "Dashboard" : "Home"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="CreateExpense" component={CreateExpenseScreen} />
        <Stack.Screen name="EditExpense" component={EditExpenseScreen} />
        <Stack.Screen name="ExpenseReport" component={ExpenseReportScreen} />
        <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
        <Stack.Screen
          name="AccountManagement"
          component={AccountManagementScreen}
        />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer.authReducer,
});

export default connect(mapStateToProps, null)(Main);
