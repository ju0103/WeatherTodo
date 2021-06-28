import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { StatusBar, Dimensions } from "react-native";
import Input from "../components/TodoInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "../components/Task";
import AppLoading from "expo-app-loading";
import { theme } from "../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  align-self: flex-start;
  margin: 0px 20px;
`;

const InputContainer = styled.View`
  width: 100%;
`;

const List = styled.ScrollView`
  width: 100%;
  margin-bottom: 50px;
`;

const TodoList = () => {
  const width = Dimensions.get("window").width;
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({});
  const [isEditing, setisEditing] = useState(false);

  const _saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem("tasks");
    console.log("loaded", loadedTasks);
    setTasks(JSON.parse(loadedTasks || "{}"));
  };

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask("");
    _saveTasks({ ...tasks, ...newTaskObject });
  };

  const _deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };

  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]["completed"] = !currentTasks[id]["completed"];
    _saveTasks(currentTasks);
  };

  const _updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  const _onBlur = () => {
    setNewTask("");
  };

  const makeEditing = (boolean) => {
    setisEditing(boolean);
  };

  return isReady ? (
    <Container>
      <ThemeProvider theme={theme}>
        <Title>To Do list</Title>
        <InputContainer>
          {!isEditing ? (
            <Input
              placeholder="+ 할 일을 추가하세요"
              value={newTask}
              onChangeText={_handleTextChange}
              onSubmitEditing={_addTask}
              onBlur={_onBlur}
            />
          ) : null}
        </InputContainer>
        <List>
          {Object.values(tasks)
            .reverse()
            .map((item) => (
              <Task
                key={item.id}
                item={item}
                makeEditing={makeEditing}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </ThemeProvider>
    </Container>
  ) : (
    <AppLoading
      startAsync={_loadTasks}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default TodoList;
