import React from "react";
import styled from "styled-components/native";

const StyledInput = styled.TextInput`
  width: 100%;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: white;
  font-size: 20px;
  color: black;
`;

const Input = () => {
  return <StyledInput />;
};

export default Input;
