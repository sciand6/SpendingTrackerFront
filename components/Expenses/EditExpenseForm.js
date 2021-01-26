import React, { useState, useEffect } from "react";
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
import { editExpense } from "../../actions/expenseActions";
import Loader from "../Utils/Loader";
import { compose } from "redux";
import DateTimePicker from "@react-native-community/datetimepicker";

function MyForm(props) {
  const { authReducer, expenseReducer, route } = props;
  const { item } = route.params;
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(item.price);
  const [date, setDate] = useState(new Date(item.day));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const editExpenseRequest = async (values) => {
    values.day = date;
    try {
      const response = await props.dispatch(
        editExpense(item._id, values, authReducer.token)
      );
      if (response.success) {
        props.navigation.navigate("Dashboard");
      }
      if (!response.success) {
        throw response;
      }
    } catch (error) {
      Alert.alert(
        "Expense Update Error",
        "There was a problem updating that expense.",
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

  useEffect(() => {
    props.initialize({
      category: item.category,
      price: item.price.toString(),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Expense</Text>
      <View style={styles.datepickerButton}>
        <Button onPress={showDatepicker} title="Date" />
      </View>
      <View style={styles.datepickerButton}>
        <Button onPress={showTimepicker} title="Time" />
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
        placeholder={"Category"}
        component={MyTextInput}
      />
      <Field
        style={styles.input}
        name={"price"}
        value={price}
        onChange={(text) => setPrice(text)}
        placeholder={"Price"}
        component={MyTextInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={props.handleSubmit(editExpenseRequest)}
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
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderRadius: 25,
    backgroundColor: "white",
    marginBottom: 10,
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
    form: "EditExpense",
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })
)(MyForm);
