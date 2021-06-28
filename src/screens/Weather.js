import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styled, { ThemeProvider } from "styled-components/native";
import TodoList from "./TodoList";
import { images } from "../images";
import CalendarModal from "../components/Modal";
import weatherOptions from "../context/weatherOptions";

const Container = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
`;

const WeatherContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 500;
`;

const IconWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 3px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
  margin: 10px;
`;

export default function Weather({ temp, condition, changeDate }) {
  const [modalVisible, setModalVisible] = useState(false);

  const modalHandler = () => {
    setModalVisible(true);
  };

  const dateHandler = (date) => {
    changeDate(date);
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <Container>
        <WeatherContainer>
          <CalendarModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setDate={dateHandler}
          ></CalendarModal>
          <MaterialCommunityIcons
            size={56}
            name={weatherOptions[condition].iconName || "weather-sunset"}
            color="#ffffff"
          />
          <TextContainer>{temp}˚c</TextContainer>
          <IconWrapper onPress={modalHandler}>
            <Icon source={images.calender} color="white"></Icon>
          </IconWrapper>
        </WeatherContainer>
      </Container>
      <TodoList></TodoList>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstrom",
    "Drizzle",
    "Rain",
    "Snow",
    "Clear",
    "Atmosphere",
    "Clouds",
    "Haze",
    "Mist",
    "Dust",
    "Weather-hazy",
  ]).isRequired,
};
