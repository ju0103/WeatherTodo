//weather import 구간
import React from "react";
import * as Location from "expo-location";
import { Alert, StatusBar } from "react-native";
import axios from "axios";
import "react-native-gesture-handler";
import moment from "moment";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Loading from "../src/screens/Loading";
import Weather from "../src/screens/Weather";
import TodoList from "../src/screens/TodoList";
//import Navigation from "../src/navigation/index";
import { theme } from "./theme";
import { ProgressProvider, UserProvider } from "./contexts";
import { ProgressProvider, UserProvider } from "./contexts";

const Tab = createBottomTabNavigator();
//weather 구간
const API_KEY = "33110bbb6f3eb8e5b3b429bc78ee27ab";

export default class extends React.Component {
  state = {
    isLoading: true,
    date: moment(new Date()).format("YYYY-MM-DD"),
    geo: [],
    condition: null,
    temp: 0,
    forcast: [],
    current: null,
  };

  getWeather = async (latitude, longitude) => {
    try {
      let result = await axios.get(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      console.log("result", result);
      console.log(moment(new Date()).format("YYYY-MM-DD"));
      this.setState({
        isLoading: false,
        condition: result.data.current.weather[0].main,
        temp: result.data.current.temp,
        current: [
          result.data.current.weather[0].main,
          result.data.current.temp,
        ],
        forcast: result.data.daily,
      });
    } catch (err) {
      alert(err);
    }
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.setState({ geo: [latitude, longitude] });
      this.getWeather(latitude, longitude);

      //console.log(coords.latitude, coords.longitude);
      //const location = await Location.getCurrentPositionAsync();
      //console.log(location);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.date !== prevState.date) {
      let nowDate = moment(new Date()).format("YYYY-MM-DD");
      let changedDate = this.state.date;
      if (nowDate != changedDate) {
        nowDate = nowDate.split("-");
        nowDate = new Date(nowDate[0], nowDate[1] - 1, nowDate[2]);
        changedDate = changedDate.split("-");
        changedDate = new Date(
          changedDate[0],
          changedDate[1] - 1,
          changedDate[2]
        );
        let difDays = (changedDate - nowDate) / 86400000;
        if (difDays < 8 && difDays > 0) {
          this.setState({
            condition: this.state.forcast[difDays]?.weather[0].main,
            temp: this.state.forcast[difDays]?.temp.day,
          });
        }
      } else {
        this.setState({
          condition: this.state.current[0],
          temp: this.state.current[1],
        });
      }
    }
  }

  changeDate = (date) => {
    this.setState({ date: date.dateString });
  };

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <ThemeProvider theme={theme}>
        <UserProvider>
          <ProgressProvider>
            <StatusBar barStyle="dark-content" />
            <Navigation />
          </ProgressProvider>
        </UserProvider>
        <StatusBar barStyle="dark-content" />
      </ThemeProvider>
    );
  }
}

{
  /* <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Weather"
              component={Weather}
              getscreenProps={
                (Math.round(this.temp), this.condition, this.changeDate)
              }
            />
            <Tab.Screen name="ToDo" component={TodoList} />
          </Tab.Navigator>
        </NavigationContainer>
        <Weather
          temp={Math.round(temp)}
          condition={condition}
          changeDate={this.changeDate}
        /> */
}
