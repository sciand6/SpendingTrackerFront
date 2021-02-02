import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { connect } from "react-redux";
import MyTextInput from "../Utils/MyTextInput";
import { createExpense } from "../../actions/expenseActions";
import Loader from "../Utils/Loader";
import { compose } from "redux";
import DateTimePicker from "@react-native-community/datetimepicker";

function MyForm(props) {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const { authReducer, expenseReducer } = props;

  const createExpenseRequest = async (values) => {
    values.day = date;
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
      Alert.alert(
        "Expense Creation Error",
        "There was a problem adding that expense.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <View style={styles.datepickerButton}>
        <Button onPress={showDatepicker} title="Enter the date" />
      </View>
      <View style={styles.datepickerButton}>
        <Button onPress={showTimepicker} title="Enter the time" />
      </View>
      {expenseReducer.isLoading && <Loader />}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Field
        style={styles.input}
        name={"category"}
        value={category}
        onChange={(text) => setCategory(text)}
        placeholder="Category"
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
    borderRadius: 25,
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#85bb65",
  },
  datepickerButton: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderRadius: 25,
    backgroundColor: "white",
    marginBottom: 15,
    width: 300,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    padding: 15,
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.category) {
    errors.category = "Category is required.";
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
