import React, { useState, useEffect, useCallback } from "react";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Header,
  UserMainWrapper,
  Greetings,
  LogoutButton,
  LogoutButtonIcon,
  SearchInputWrapper,
  CompaniesWrapper
} from "./styles";
import { SearchInput } from "../../components/form/SearchInput";
import { CompanyCard } from "../../components/CompanyCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BottomMenu } from "../../components/BottomMenu";

interface LocationProps {
  latitude: string;
  longitude: string;
}

import { API_PATH, API_IP } from "@env";
import { ViewInformation } from "../../components/ViewInformation";
import { Loading } from "../../components/Loading";

export function Home() {

  const [location, setLocation] = useState<LocationProps | null>(null);
  const [company, setCompany] = useState([]);
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const imgServerPrefix = `http://${API_IP}/petlove/sistema/assets/media/user_img/`;
  const Navigation = useNavigation();

  async function loadUserData() {
    const dataKey = "@petlove:user";
    const user = await AsyncStorage.getItem(dataKey);
    const userJson = JSON.parse(user!);
    setUserData(userJson);
  }

  async function loadCompanies() {
    setIsLoading(true);
    if (location) {
      const endPoint = `${API_PATH}/usuario/pesquisarempresas/raio/${location.latitude}/${location.longitude}`;
      const companies = await fetch(endPoint, { method: "GET" })
        .then(response => response.json());
      setCompany(companies);
    } else {
      findCompanyByName("");
    }
    setIsLoading(false);
  }

  async function getUserLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    const dataKey = "@petlove:location";
    await AsyncStorage.removeItem(dataKey);
    setLocation(null);
    if (status !== "granted") {
      //usuário não permitiu a localicação
      await AsyncStorage.removeItem(dataKey);
      setLocation(null);
    } else {
      let location = await Location.getCurrentPositionAsync({});
      console.log("Localização", location);
      const locationData = {
        longitude: String(location.coords.latitude),
        latitude: String(location.coords.longitude)
      }
      setLocation(locationData);
      await AsyncStorage.setItem(dataKey, JSON.stringify(locationData));
    }
  }

  async function findCompanyByName(name: string) {
    const bar = name.trim().length === 0 ? "" : "/";
    const endPoint = `${API_PATH}/usuario/pesquisarempresas/byname${bar}${name}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json())
      .catch(error => []);

    setCompany(response);
  }

  function handleButton() {
    findCompanyByName(search);
  }

  async function logout() {
    const dataKey = "@petlove:user";
    await AsyncStorage.removeItem(dataKey);
    Navigation.navigate("SignIn");
  }

  useFocusEffect(
    useCallback(() => {
      loadUserData();
      getUserLocation();
    }, [])
  );

  useEffect(() => {
    loadCompanies();
  }, [location]);

  if (isLoading) return <Loading />
  return (
    <Container>
      <Header>
        <UserMainWrapper>
          <Greetings>Olá, {userData.nome}</Greetings>
          <LogoutButton>
            <LogoutButtonIcon name="power" size={30} color="white" onPress={logout} />
          </LogoutButton>
        </UserMainWrapper>
      </Header>

      <SearchInputWrapper>
        <SearchInput title="Nome da empresa" value={search} onChangeText={setSearch} onPress={handleButton} />
      </SearchInputWrapper>

      <CompaniesWrapper
        showsVerticalScrollIndicator={false}
        data={company}
        keyExtractor={item => item.id}
        renderItem={
          ({ item }) =>
            <CompanyCard
              id={item.id}
              name={item.name}
              phone={item.phone}
              photo={imgServerPrefix + item.photo}
              street={item.street}
              number={item.number}
            />
        }
      />

      {
        company.length === 0 && <ViewInformation />
      }
      <BottomMenu />
    </Container>
  );
}