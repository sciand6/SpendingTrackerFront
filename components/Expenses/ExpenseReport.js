import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getExpenses } from "../../actions/expenseActions";

function ExpenseReport(props) {
  const { authReducer, expenseReducer } = props;
  const [expenseReport, setExpenseReport] = useState([]);

  useEffect(() => {
    props.dispatch(getExpenses(authReducer.token));
    let report = {};
    let reportArr = [];
    let total = 0;
    if (expenseReducer.expenses.length !== 0) {
      // Generate expense report object
      for (let expense of expenseReducer.expenses) {
        total += expense.price;
        if (report[expense.category] === undefined) {
          report[expense.category] = expense.price;
        } else {
          report[expense.category] += expense.price;
        }
      }
      // Convert report object to array of expense objects
      for (let eReport of Object.entries(report)) {
        let reportObject = {
          category: eReport[0],
          price: eReport[1],
          percentage: (eReport[1] / total) * 100,
        };
        reportArr.push(reportObject);
      }
      // Sort array by price in descending order
      reportArr.sort((exp1, exp2) => (exp1.price < exp2.price ? 1 : -1));
      setExpenseReport(reportArr);
    }
  }, []);

  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Total Expense Report</Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.category}
        data={expenseReport}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.category}</Text>
            <Text>{item.percentage.toFixed(2)}%</Text>
            <Text>{parseFloat(item.price).toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "green",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#d2d2d2",
    padding: 15,
  },
});

const mapStateToProps = (state) => ({
  authReducer: state.authReducer.authReducer,
  expenseReducer: state.expenseReducer.expenseReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseReport);
