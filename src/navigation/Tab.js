import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodoList from "../screens/TodoList";
import Weather from "../screens/Weather";

const Tab = createBottomTabNavigator();

//<Weather temp={Math.round(temp)} condition={condition} changeDate={this.changeDate} />

const weatherOptions = {
  temp: Math.round(temp),
  condition: condition,
  changeDate: { changeDate },
};

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Weather"
        component={Weather}
        getscreenProps={
          (weatherOptions.temp,
          weatherOptions.condition,
          weatherOptions.changeDate)
        }
      />
      <Tab.Screen name="ToDo" component={TodoList} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
