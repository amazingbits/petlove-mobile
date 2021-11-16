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

interface PetProps {
  animal_comportamento: string;
  animal_raca: string;
  dono: string;
  id: string;
  nascimento: string;
  nome: string;
  sexo: string;
}

interface VaccinationProps {
  id: number;
  animal: number;
  vacina: number;
  data_aplicacao: string;
  descVacina: string;
  nomeAnimal: string;
  status: string;
}

export function Vaccination() {
  const [currentPet, setCurrentPet] = useState<PetProps>({} as PetProps);
  const [petVaccination, setPetVaccionation] = useState<VaccinationProps>({} as VaccinationProps);

  const theme = useTheme();
  const { navigate } = useNavigation();

  async function getPetInformation() {
    const dataKey = "@petlove:current_pet";
    const pet = await AsyncStorage.getItem(dataKey);
    const petJson = JSON.parse(pet!);
    const params = {
      animal_comportamento: petJson[0].animal_comportamento,
      animal_raca: petJson[0].animal_raca,
      dono: petJson[0].dono,
      id: petJson[0].id,
      nascimento: petJson[0].nascimento,
      nome: petJson[0].nome,
      sexo: petJson[0].sexo
    };

    setCurrentPet(params);
  }

  async function getPetVaccination() {
    const dataKey = "@petlove:current_pet_vaccination";
    const vacc = await AsyncStorage.getItem(dataKey);
    const vaccInfo = JSON.parse(vacc!);
    setPetVaccionation(vaccInfo);
  }

  async function handleVaccinationNavigate(vaccination: string) {
    const dataKey = "@petlove:current_vaccination_to_edit";
    await AsyncStorage.setItem(dataKey, String(vaccination));
    navigate("EditVaccination");
  }

  useFocusEffect(
    useCallback(() => {
      getPetInformation();
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
    </Container>
  );
}