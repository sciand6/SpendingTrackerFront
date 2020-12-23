import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MyTextInput from "./MyTextInput";
import { createExpense, getExpenses } from "../actions/expenseActions";
import { compose } from "redux";
import Loader from "./Loader";

function MyForm(props) {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const { authData } = props;

  const createExpenseRequest = async (values) => {
    try {
      const response = await props.dispatch(
        createExpense(values, authData.token)
      );
      if (!response.success) {
        throw response;
      }
      props.dispatch(getExpenses(authData.token));
    } catch (error) {
      Alert.alert("Expense Creation Error", error.msg, [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View>
      <Field
        name={"category"}
        value={category}
        onChange={(text) => setCategory(text)}
        placeholder="Item/Category"
        component={MyTextInput}
      />
      <Field
        name={"price"}
        value={price}
        onChange={(text) => setPrice(parseFloat(text).toFixed(2) || price)}
        placeholder="Price"
        component={MyTextInput}
      />
      <TouchableOpacity onPress={props.handleSubmit(createExpenseRequest)}>
        <Text>Submit!</Text>
      </TouchableOpacity>
    </View>
  );
}

const validate = (values) => {
  const errors = {};
  if (!values.category) {
    errors.category = "Category/item is required.";
  }
  if (!values.price || isNaN(values.price)) {
    errors.price = "Enter a valid number for price.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "CreateExpense",
    validate,
  })
)(MyForm);
