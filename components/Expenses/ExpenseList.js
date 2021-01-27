import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { getExpenses, deleteExpense } from "../../actions/expenseActions";

function ExpenseList(props) {
  const { authReducer, expenseReducer } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [weeklyTotal, setWeeklyTotal] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    props.dispatch(getExpenses(authReducer.token));
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
      Alert.alert(
        "Expense Deletion Error",
        "There was a problem deleting that expense.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
  };

  useEffect(() => {
    let curDate = new Date();
    let lastday = curDate.getDate() - (curDate.getDay() - 1) + 6;
    let firstday = curDate.getDate() - curDate.getDay();
    let sunday = new Date(curDate.setDate(firstday));
    let saturday = new Date(curDate.setDate(lastday));
    saturday.setHours(0, 0, 0, 0);
    sunday.setHours(0, 0, 0, 0);
    let sum = 0;
    for (let exp of expenseReducer.expenses) {
      if (
        new Date(exp.day).getTime() >= sunday.getTime() &&
        new Date(exp.day).getTime() <= saturday.getTime()
      ) {
        sum += exp.price;
      }
    }
    setWeeklyTotal(sum);
  }, [expenseReducer.expenses]);

  useEffect(() => {
    if (!expenseReducer.isLoading) {
      setRefreshing(false);
    }
  }, [expenseReducer.isLoading]);

  useEffect(() => {
    props.dispatch(getExpenses(authReducer.token));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.weeklyTotalText}>
          You've spent {weeklyTotal.toFixed(2)} this week.
        </Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            props.navigation.navigate("CreateExpense");
          }}
        >
          <Text style={styles.headerButtonText}>ADD{"\n"}EXPENSE</Text>
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
              <View style={styles.expenseItemHeader}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteExpenseRequest(item._id)}
                >
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
                <Button
                  title="Edit"
                  onPress={() =>
                    props.navigation.navigate("EditExpense", { item })
                  }
                />
              </View>
              <View style={styles.expenseItemBody}>
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
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deleteButton: { marginVertical: 2, marginHorizontal: 2 },
  deleteButtonText: {
    color: "red",
    fontWeight: "700",
    fontSize: 18,
  },
  expenseItem: {
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  expenseItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  expenseItemBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenseItemText: {
    fontSize: 20,
  },
  headerButton: {
    borderWidth: 3,
    borderColor: "#d2d2d2",
    alignItems: "center",
    width: 80,
    height: 80,
    backgroundColor: "darkred",
    borderRadius: 80,
  },
  headerButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
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
    backgroundColor: "green",
  },
  weeklyTotalText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    width: 100,
    height: 100,
    marginTop: 25,
  },
});

const mapStateToProps = (state) => ({
  authReducer: state.authReducer.authReducer,
  expenseReducer: state.expenseReducer.expenseReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
