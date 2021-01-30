import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getExpenses } from "../../actions/expenseActions";
import DateTimePicker from "@react-native-community/datetimepicker";

function ExpenseReport(props) {
  const { authReducer, expenseReducer } = props;
  const [expenseReport, setExpenseReport] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [fromDate, setFromDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [showToDate, setShowToDate] = useState(false);
  const [mode, setMode] = useState("date");

  useEffect(() => {
    props.dispatch(getExpenses(authReducer.token));
    let report = {};
    let reportArr = [];
    let total = 0;
    if (expenseReducer.expenses.length !== 0) {
      // Generate expense report object
      for (let expense of expenseReducer.expenses) {
        let dateRef = new Date(expense.day);
        if (
          dateRef.getTime() >= fromDate.getTime() &&
          dateRef.getTime() <= toDate.getTime()
        ) {
          total += expense.price;
          if (report[expense.category] === undefined) {
            report[expense.category] = expense.price;
          } else {
            report[expense.category] += expense.price;
          }
        }
      }
      setTotalSpent(total);
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
  }, [fromDate, toDate]);

  const changeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowFromDate(Platform.OS === "ios");
    setFromDate(currentDate);
  };

  const changeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowToDate(Platform.OS === "ios");
    setToDate(currentDate);
  };

  const showMode = (currentMode, interval) => {
    if (interval === "from") {
      setShowFromDate(true);
      setMode(currentMode);
    } else {
      setShowToDate(true);
      setMode(currentMode);
    }
  };

  const showDatepicker = (interval) => {
    showMode("date", interval);
  };

  return (
    <View>
      <View style={styles.heading}>
        {showFromDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={changeFromDate}
          />
        )}
        {showToDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={toDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={changeToDate}
          />
        )}
        <View style={styles.dateButtonView}>
          <View style={styles.buttonSpacer}>
            <Button onPress={() => showDatepicker("from")} title="From Date" />
          </View>
          <Button onPress={() => showDatepicker("to")} title="To Date" />
        </View>
        <Text style={styles.headingText}>
          {fromDate.getMonth() +
            parseInt(1) +
            "/" +
            fromDate.getDate() +
            "/" +
            fromDate.getFullYear() +
            " - " +
            toDate.getMonth() +
            parseInt(1) +
            "/" +
            toDate.getDate() +
            "/" +
            toDate.getFullYear()}
        </Text>
        <Text style={styles.headingText}>
          Total Spent: {totalSpent.toFixed(2)}
        </Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.category}
        data={expenseReport}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.category}</Text>
            <Text style={styles.listItemText}>
              {parseFloat(item.price).toFixed(2)}
            </Text>
            <Text style={styles.listItemText}>
              {item.percentage.toFixed(2)}%
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSpacer: {
    marginRight: 20,
  },
  dateButtonView: {
    flexDirection: "row",
  },
  heading: {
    backgroundColor: "green",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#d2d2d2",
    padding: 15,
  },
  listItemText: {
    fontSize: 18,
    fontWeight: "normal",
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
