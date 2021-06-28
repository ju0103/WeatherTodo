import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "../utils/Dimensions";

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.ButtonContainer} {...rest}>
      <Text style={styles.ButtonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  ButtonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#2979ff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  ButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
