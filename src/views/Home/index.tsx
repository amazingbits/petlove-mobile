import React, { useState, useEffect } from "react";
import { Text } from "react-native";
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

import { API_IP, API_ENDPOINT } from "@env";

export function Home() {

  const [location, setLocation] = useState<LocationProps>({} as LocationProps);
  const [company, setCompany] = useState([]);
  const [search, setSearch] = useState('');
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

  const imgServerPrefix = `http://${API_IP}/petlove/sistema/assets/media/user_img/`;
  async function loadCompanies() {

    if (location.latitude !== undefined) {
      const endPoint = `http://${API_IP}${API_ENDPOINT}/usuario/pesquisarempresas/raio/${location.latitude}/${location.longitude}`;

      const companies = await fetch(endPoint, {
        method: "GET",
      }).then(response => response.json())
        .catch(error => error.text());

      setCompany(companies);

    } else {
      findCompanyByName("");
    }
  }

  async function findCompanyByName(name: string) {
    const bar = name.trim().length === 0 ? "" : "/";
    const endPoint = `http://${API_IP}${API_ENDPOINT}/usuario/pesquisarempresas/byname${bar}${name}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json())
      .catch(error => []);

    setCompany(response);
  }

  useEffect(() => {
    (async () => {
      const dataKey = "@petlove:location";
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        await AsyncStorage.removeItem(dataKey);
      } else {
        let location = await Location.getCurrentPositionAsync({});
        const locationData = {
          latitude: String(location.coords.latitude),
          longitude: String(location.coords.longitude)
        }

        setLocation(locationData);
        await AsyncStorage.setItem(dataKey, JSON.stringify(locationData));
      }
    })();

    loadUserData();
  }, []);

  useFocusEffect(() => {
    loadCompanies();
  });

  const { navigate } = useNavigation();

  function handleButton() {
    findCompanyByName(search);
  }

  async function logout() {
    const dataKey = "@petlove:user";
    await AsyncStorage.removeItem(dataKey);
    navigate("SignIn");
  }

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
        renderItem={({ item }) => (
          <CompanyCard
            id={item.id}
            name={item.name}
            phone={item.phone}
            photo={imgServerPrefix + item.photo}
            street={item.street}
            number={item.number}
          />
        )}
      />

      {
        !company && <Text>Nenhuma empresa encontrada</Text>
      }
      <BottomMenu />
    </Container>
  );
}