import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { getExpenses } from "../actions/expenseActions";

function Dashboard(props) {
  const { authData, expenseData, getUser } = props;

  useEffect(() => {
    if (authData.isLoggedIn) {
      props.dispatch(getExpenses(authData.token));
    } else {
      props.navigation.navigate("Home");
    }
  }, [expenseData, authData]);

  return (
    <View>
      <Text>
        Welcome {getUser.userDetails ? getUser.userDetails.user.username : ""}
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.dispatch(logoutUser());
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      {expenseData.expenses.length !== 0 ? (
        <FlatList
          keyExtractor={(item) => item._id}
          data={expenseData.expenses}
          renderItem={({ item }) => (
            <Text>
              {new Date(item.day).getMonth() +
                parseInt(1) +
                "/" +
                new Date(item.day).getDate() +
                "/" +
                new Date(item.day).getFullYear()}{" "}
              | {item.category} | {item.price}
            </Text>
          )}
        />
      ) : (
        <Text>No expenses found. Did you add any?</Text>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
  expenseData: state.expenseReducer.getExpenses,
  getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
