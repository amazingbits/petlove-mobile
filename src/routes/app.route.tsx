import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../views/SignIn";
import { SignUp } from "../views/SignUp";
import { Home } from "../views/Home";
import { Pets } from "../views/Pets";
import { NewPet } from "../views/NewPet";
import { PetChoice } from "../views/PetChoice";
import { Vaccination } from "../views/Vaccination";
import { NewVaccination } from "../views/NewVaccination";
import { EditVaccination } from "../views/EditVaccination";
import { NewDocument } from "../views/NewDocument";
import { Documents } from "../views/Documents";
import { EditDocument } from "../views/EditDocument";
import { ForgotPassword } from "../views/ForgotPassword";

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
      <Stack.Screen name="PetChoice" component={PetChoice} />
      <Stack.Screen name="Vaccination" component={Vaccination} />
      <Stack.Screen name="NewVaccination" component={NewVaccination} />
      <Stack.Screen name="EditVaccination" component={EditVaccination} />
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="NewDocument" component={NewDocument} />
      <Stack.Screen name="EditDocument" component={EditDocument} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}