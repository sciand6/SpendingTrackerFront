import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { getExpenses } from "../actions/expenseActions";

function Dashboard(props) {
  const { getUser, expenseData } = props;

  useEffect(() => {
    if (getUser.userDetails) {
      props.dispatch(getExpenses(getUser.userDetails.token));
    }
  });

  return (
    <View>
      <Text>
        Welcome {getUser.userDetails ? getUser.userDetails.user.username : ""}
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.dispatch(logoutUser());
          props.navigation.navigate("Home");
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      {expenseData.expenses.expenses.length !== 0 ? (
        expenseData.expenses.expenses.map((exp) => {
          return <Text key={exp.day}>{exp.category}</Text>;
        })
      ) : (
        <Text>No expenses found. Did you add any?</Text>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser,
  expenseData: state.expenseReducer.getExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
