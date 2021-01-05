import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MyTextInput from "./MyTextInput";
import { createExpense } from "../actions/expenseActions";
import Loader from "./Loader";
import { compose } from "redux";

function MyForm(props) {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const { authReducer, expenseReducer } = props;

  const createExpenseRequest = async (values) => {
    try {
      const response = await props.dispatch(
        createExpense(values, authReducer.token)
      );
      if (response.success) {
        props.navigation.navigate("Dashboard");
      }
      if (!response.success) {
        throw response;
      }
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
    <View style={styles.container}>
      {expenseReducer.isLoading && <Loader />}
      <Field
        style={styles.input}
        name={"category"}
        value={category}
        onChange={(text) => setCategory(text)}
        placeholder="Item/Category"
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"price"}
        value={price}
        onChange={(text) => setPrice(text)}
        placeholder="Price"
        component={MyTextInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={props.handleSubmit(createExpenseRequest)}
      >
        <Text style={styles.buttonText}>Submit!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginTop: 5,
    width: 250,
    borderRadius: 25,
    height: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#85bb65",
  },
  input: {
    borderBottomColor: "#d2d2d2",
    borderBottomWidth: 1,
    backgroundColor: "white",
    width: 250,
    height: 40,
    marginBottom: 10,
  },
});

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
  authReducer: state.authReducer.authReducer,
  expenseReducer: state.expenseReducer.expenseReducer,
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
