import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { getExpenses } from "../actions/expenseActions";

function Dashboard(props) {
  const { getUser, expenseData } = props;

  if (getUser.userDetails) {
    props.dispatch(getExpenses(getUser.userDetails.token));
  }
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
      {expenseData.msg === "fetch successful" ? (
        <FlatList
          keyExtractor={(item) => item._id}
          data={expenseData.expenses.expenses}
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
  getUser: state.userReducer.getUser,
  expenseData: state.expenseReducer.getExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
