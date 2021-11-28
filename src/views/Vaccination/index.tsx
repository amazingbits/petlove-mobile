import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { API_PATH } from "@env";

import {
  Container,
  List,
  ListWrapper
} from "./styles";
import { NewBtn } from "../../components/NewBtn";
import { ButtonVaccination } from "../../components/ButtonVaccination";
import { useTheme } from "styled-components";
import { Header } from "../../components/Header";
import { ViewInformation } from "../../components/ViewInformation";

interface PetProps {
  nome: string;
  id: string;
}

export function Vaccination() {
  const [currentPet, setCurrentPet] = useState<PetProps>({} as PetProps);
  const [petVaccination, setPetVaccionation] = useState([]);

  const theme = useTheme();
  const { navigate } = useNavigation();

  async function getPetInformation() {
    const pet = await AsyncStorage.getItem("@petlove:current_pet");
    const petJson = JSON.parse(pet!);
    const params = {
      nome: petJson[0].nome,
      id: petJson[0].id
    };

    setCurrentPet(params);
  }

  async function getPetVaccination() {

    await getPetInformation();

    const pet = await AsyncStorage.getItem("@petlove:current_pet");
    const petJson = JSON.parse(pet!);
    const petId = petJson[0].id;

    const endPoint = `${API_PATH}/vacinacao/byanimal/${petId}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json());

    setPetVaccionation(response);
  }

  async function handleVaccinationNavigate(vaccination: string) {
    const dataKey = "@petlove:current_vaccination_to_edit";
    await AsyncStorage.setItem(dataKey, String(vaccination));
    navigate("EditVaccination");
  }

  useEffect(() => {
    getPetVaccination();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getPetVaccination();
    }, [])
  );

  const title = `${currentPet.nome} - Vacinação`;
  return (
    <Container>
      <Header title={title} />

      <ListWrapper>
        <List
          data={petVaccination}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ButtonVaccination
              title={item.descVacina}
              background={item.status === "ok" ? theme.colors.success_light : theme.colors.danger_light}
              onPress={() => handleVaccinationNavigate(item.id)}
            />
          )}
        />
      </ListWrapper>


      <NewBtn onPress={() => { navigate("NewVaccination") }} />

      {petVaccination.length === 0 && <ViewInformation />}
    </Container>
  );
}