import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import ExpenseListScreen from "../screens/Home/Expenses/ExpenseListScreen";
import ExpenseReportScreen from "../screens/Home/Expenses/ExpenseReportScreen";
import AccountManagementScreen from "../screens/Auth/AccountMangementScreen";
import { connect } from "react-redux";

function Dashboard(props) {
  const [buttonActive, setButtonActive] = useState(1);
  const { authReducer } = props;

  useEffect(() => {
    if (!authReducer.isLoggedIn) {
      props.navigation.navigate("Home");
    }
  }, [authReducer.isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={
            buttonActive == 1 ? styles.activeHeaderButton : styles.headerButton
          }
          onPress={() => {
            setButtonActive(1);
          }}
        >
          <Text style={styles.headerButtonText}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            buttonActive == 2 ? styles.activeHeaderButton : styles.headerButton
          }
          onPress={() => {
            setButtonActive(2);
          }}
        >
          <Text style={styles.headerButtonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            buttonActive == 3 ? styles.activeHeaderButton : styles.headerButton
          }
          onPress={() => {
            setButtonActive(3);
          }}
        >
          <Text style={styles.headerButtonText}>Account</Text>
        </TouchableOpacity>
      </View>
      {buttonActive == 1 ? (
        <ExpenseListScreen navigation={props.navigation} />
      ) : (
        <View></View>
      )}
      {buttonActive == 2 ? (
        <ExpenseReportScreen navigation={props.navigation} />
      ) : (
        <View></View>
      )}
      {buttonActive == 3 ? (
        <AccountManagementScreen navigation={props.navigation} />
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activeHeaderButton: {
    borderBottomWidth: 4,
    padding: 5,
    borderColor: "black",
    alignItems: "center",
    width: "33.4%",
    backgroundColor: "#e1e1e1",
  },
  activeHeaderButtonText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  headerButton: {
    borderBottomWidth: 4,
    padding: 5,
    borderColor: "#ccc",
    alignItems: "center",
    width: "33.25%",
  },
  headerButtonText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  authReducer: state.authReducer.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
