import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Header,
  Title,
  PetList
} from "./styles";

import { API_IP, API_ENDPOINT } from "@env";
import { PetCard } from "../../components/PetCard";
import { NewBtn } from "../../components/NewBtn";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

interface UserProps {
  id: string;
}

export function Pets() {

  const dataKey = "@petlove:user";
  const [userInfo, setUserInfo] = useState<UserProps>({} as UserProps);
  const [animalList, setAnimalList] = useState([]);

  const { navigate } = useNavigation();

  async function handleButton(id: string) {
    const dataKey = "@petlove:current_pet";
    await AsyncStorage.setItem(dataKey, id);
  }

  async function update() {
    const user = await AsyncStorage.getItem(dataKey);
    const userJson = JSON.parse(user!);
    const userDt = {
      id: userJson.id
    }
    setUserInfo(userDt);
  }

  useEffect(() => {
    update();
  }, []);

  async function getAnimalList(idUser: string) {
    const endPoint = `http://${API_IP}${API_ENDPOINT}/animal/info/byuser/${idUser}`;
    const res = await fetch(endPoint, { method: "GET" })
      .then(response => response.json())
      .catch(error => []);

    setAnimalList(res);
  }

  useFocusEffect(() => {
    getAnimalList(userInfo.id);
  });

  return (
    <Container>
      <Header>
        <Title>Meus pets</Title>
      </Header>

      <PetList
        data={animalList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PetCard title={item.nome} onPress={() => handleButton(item.id)} />
        )}
      />

      <NewBtn onPress={() => navigate("NewPet")} />
    </Container>
  );
}