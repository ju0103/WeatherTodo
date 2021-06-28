import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "../utils/Dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FormInput = ({ labelValue, placeholderText, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor={"#666"}
        {...rest}
      ></TextInput>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
    width: windowWidth - 40,
    height: windowHeight / 15,
    backgroundColor: "#fafafa",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  inputField: {
    padding: 10,
    margin: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 1.5,
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
