import React from "react";
import EditExpenseForm from "../../../components/Expenses/EditExpenseForm";

export default function EditExpenseScreen({ navigation, route }) {
  return <EditExpenseForm navigation={navigation} route={route} />;
}
