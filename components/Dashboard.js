import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { getExpenses, deleteExpense } from "../actions/expenseActions";

function Dashboard(props) {
  const { authReducer, expenseReducer } = props;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    props.dispatch(getExpenses(authReducer.token));
    setRefreshing(false);
  };

  const deleteExpenseRequest = async (id) => {
    try {
      const response = await props.dispatch(
        deleteExpense(id, authReducer.token)
      );
      if (!response.success) {
        throw response;
      } else {
        props.dispatch(getExpenses(authReducer.token));
      }
    } catch (error) {
      Alert.alert("Expense Deletion Error", error.msg, [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  useEffect(() => {
    if (authReducer.isLoggedIn) {
      props.dispatch(getExpenses(authReducer.token));
    } else {
      props.navigation.navigate("Home");
    }
  }, [authReducer.isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            props.dispatch(logoutUser());
          }}
        >
          <Text style={styles.logoutText}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addExpenseButton}
          onPress={() => {
            props.navigation.navigate("CreateExpense");
          }}
        >
          <Text style={styles.addExpenseButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item._id}
          data={expenseReducer.expenses}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteExpenseRequest(item._id)}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.expenseItemText}>
                {new Date(item.day).getMonth() +
                  parseInt(1) +
                  "/" +
                  new Date(item.day).getDate() +
                  "/" +
                  new Date(item.day).getFullYear()}
              </Text>
              <Text style={styles.expenseItemText}>{item.category}</Text>
              <Text style={styles.expenseItemText}>
                {parseFloat(item.price).toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addExpenseButton: {
    borderWidth: 5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "darkred",
    borderRadius: 45,
  },
  addExpenseButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  deleteButton: { marginVertical: 2, marginHorizontal: 2 },
  deleteButtonText: {
    color: "red",
    fontWeight: "700",
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
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  listContainer: {
    flex: 4,
  },
  logoutButton: {
    borderWidth: 5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "darkred",
    borderRadius: 45,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
});

const mapStateToProps = (state) => ({
  authReducer: state.authReducer.authReducer,
  expenseReducer: state.expenseReducer.expenseReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
