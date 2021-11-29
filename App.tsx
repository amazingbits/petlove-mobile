import React, { useState, useEffect } from 'react';

import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultStackRoutes } from "./src/routes/app.route";
import { Loading } from './src/components/Loading';


export default function App() {

  const [userData, setUserData] = useState([]);

  async function loadUserData() {
    const dataKey = "@petlove:user";
    const user = await AsyncStorage.getItem(dataKey);
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    } else {
      setUserData([]);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  const page = userData.nome !== undefined ? "Home" : "SignIn";
  return (
    <ThemeProvider theme={theme} >

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <NavigationContainer>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <DefaultStackRoutes page={page} />
        </TouchableWithoutFeedback>
      </NavigationContainer>

    </ThemeProvider>
  );
}
