import React, { useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { getExpenses } from "../actions/expenseActions";
import CreateExpenseForm from "./CreateExpenseForm";

function Dashboard(props) {
  const { authData, expenseData, getUser } = props;

  useEffect(() => {
    if (authData.isLoggedIn) {
      props.dispatch(getExpenses(authData.token));
    } else {
      props.navigation.navigate("Home");
    }
  }, [authData.isLoggedIn]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome {getUser.userDetails ? getUser.userDetails.user.username : ""}
      </Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          props.dispatch(logoutUser());
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <CreateExpenseForm />
      {expenseData.expenses.length !== 0 ? (
        <FlatList
          keyExtractor={(item) => item._id}
          data={expenseData.expenses}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseItemText}>
                {new Date(item.day).getMonth() +
                  parseInt(1) +
                  "/" +
                  new Date(item.day).getDate() +
                  "/" +
                  new Date(item.day).getFullYear()}
              </Text>
              <Text style={styles.expenseItemText}>{item.category}</Text>
              <Text style={styles.expenseItemText}>{item.price}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No expenses found. Did you add any?</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#d2d2d2",
    padding: 15,
  },
  expenseItemText: {
    fontSize: 16,
  },
  header: {
    position: "absolute",
    paddingTop: StatusBar.currentHeight,
  },
  logoutButton: {
    alignSelf: "flex-end",
    backgroundColor: "green",
    borderRadius: 15,
    padding: 5,
  },
  logoutText: {
    color: "white",
  },
});

const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
  expenseData: state.expenseReducer.getExpenses,
  getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
