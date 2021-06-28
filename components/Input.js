import React from "react";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import PropTypes from "proptypes";

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  height: 50px;
  margin: 10px 0;
  padding: 15px 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 17px;
  color: ${({ theme }) => theme.text};
`;

const Input = ({
  placeholder,
  keyboardAppearance,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => {
  const width = useWindowDimensions().width;
  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance={keyboardAppearance}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  keyboardAppearance: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Input;
