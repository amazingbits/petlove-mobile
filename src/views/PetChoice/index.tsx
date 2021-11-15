import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_IP, API_ENDPOINT } from "@env";

import {
  Container,
  Header,
  Title,
  ButtonWrapper,
  ResumeWrapper,
  DogImage,
  DogCard,
  Row,
  CardTitle,
  CardInfo
} from "./styles";
import { PetButton } from "../../components/PetButton";

interface PetProps {
  animal_comportamento: string;
  animal_raca: string;
  dono: string;
  id: string;
  nascimento: string;
  nome: string;
  sexo: string;
}

export function PetChoice() {
  const [currentPet, setCurrentPet] = useState<PetProps>({} as PetProps);
  const { navigate } = useNavigation();

  async function handleButtonPressedVaccine() {
    const dataKey = "@petlove:current_pet_vaccination";
    const petId = currentPet.id;
    const endPoint = `http://${API_IP}${API_ENDPOINT}/vacinacao/byanimal/${petId}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json());
    await AsyncStorage.setItem(dataKey, JSON.stringify(response));
    navigate("Vaccination");
  }

  async function handleButtonPressedDocs() {
    console.log("Ir para a página de documentos");
  }

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

  useEffect(() => {
    getPetInformation();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{currentPet.nome}</Title>
      </Header>

      <ResumeWrapper>
        <DogImage source={require("../../assets/cao.png")} style={{
          width: 100,
          height: 100
        }} />

        <DogCard>
          <Row>
            <CardTitle>Raça:</CardTitle>
            <CardInfo>{currentPet.animal_raca}</CardInfo>
          </Row>

          <Row>
            <CardTitle>Comportamento:</CardTitle>
            <CardInfo>{currentPet.animal_comportamento}</CardInfo>
          </Row>

          <Row>
            <CardTitle>Nascimento:</CardTitle>
            <CardInfo>{currentPet.nascimento}</CardInfo>
          </Row>

          <Row>
            <CardTitle>Sexo:</CardTitle>
            <CardInfo>{currentPet.sexo}</CardInfo>
          </Row>

          <Row>
            <CardTitle>Dono:</CardTitle>
            <CardInfo>{currentPet.dono}</CardInfo>
          </Row>
        </DogCard>
      </ResumeWrapper>

      <ButtonWrapper>
        <PetButton title="Vacinação" iconName="medical-services" onPress={handleButtonPressedVaccine} />
        <PetButton title="Documentos" iconName="cases" onPress={handleButtonPressedDocs} />
      </ButtonWrapper>
    </Container>
  );
}