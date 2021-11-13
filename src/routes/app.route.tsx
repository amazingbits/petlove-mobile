import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../views/SignIn";
import { SignUp } from "../views/SignUp";
import { Home } from "../views/Home";
import { Pets } from "../views/Pets";
import { NewPet } from "../views/NewPet";

const Stack = createStackNavigator();

interface PageProps {
  page: string;
}

export function DefaultStackRoutes({ page }: PageProps) {
  return (
    <Stack.Navigator initialRouteName={page} screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pets" component={Pets} />
      <Stack.Screen name="NewPet" component={NewPet} />
    </Stack.Navigator>
  );
}