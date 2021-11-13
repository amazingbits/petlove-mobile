import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../views/Home";

const Tab = createBottomTabNavigator();

export function BottomRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Pets" component={Home} />
    </Tab.Navigator>
  );
}