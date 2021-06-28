import React, { useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import IconButton from "./IconButton";
import { images } from "../images";
import Input from "./TodoInput";

const Contents = styled.Text`
  flex: 1;
  font-size: 20px;
  color: ${({ theme, completed }) => (completed ? theme.done : "#ffffff")};
  text-decoration-line: ${({ completed }) =>
    completed ? "line-through" : "none"};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  border-color: ${({ theme }) => "#ffffff"};
  border-bottom-width: 1px;
  z-index: 3;
`;

const Task = ({ deleteTask, item, toggleTask, updateTask, makeEditing }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const _handUpdateButtonPress = () => {
    setIsEditing(true);
    makeEditing(true);
  };
  const _onSubmitEditing = () => {
    console.log("submit");
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      makeEditing(false);
      updateTask(editedTask);
    }
  };
  const _onBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      makeEditing(false);
      console.log(item.text);
      setText(item.text);
    }
  };

  return isEditing ? (
    <Input
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={_onSubmitEditing}
      onBlur={_onBlur}
    />
  ) : (
    <ItemContainer>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      <Contents completed={item.completed}>{item.text}</Contents>
      {item.completed || (
        <IconButton type={images.update} onPressOut={_handUpdateButtonPress} />
      )}
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
        completed={item.completed}
      />
    </ItemContainer>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;
