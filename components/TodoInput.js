import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: "#fff",
}))`
  width: 100%;
  height: 60px;
  margin-top: 3%;
  margin-bottom: 3%;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 20px;
  border: 1px solid #fff;
  color: #fff;
`;

const TodoInput = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => {
  const width = Dimensions.get("window").width;

  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      maxLenght={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance="dark"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
};

TodoInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default TodoInput;
