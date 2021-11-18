import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_PATH } from "@env";
import AppLoading from "expo-app-loading";

import {
  Container,
  ContentWrapper,
  InfoCard,
  Row,
  TextBold,
  TextRegular,
  Text
} from "./styles";
import { Header } from "../../components/Header";
import { Title } from "../../components/animalResume/Title";
import { VaccinationCard } from "../../components/animalResume/VaccinationCard";
import { DocumentCard } from "../../components/animalResume/DocumentCard";

export function AnimalResume() {
  const [animal, setAnimal] = useState(null);
  const [vaccination, setVaccination] = useState(null);
  const [document, setDocument] = useState(null);

  async function getAnimalInfo() {
    const animalInfo = await AsyncStorage.getItem("@petlove:current_pet");
    const animalInfoJson = JSON.parse(animalInfo!);
    setAnimal(animalInfoJson);
  }

  async function getAnimalVaccinations() {
    const animalInfo = await AsyncStorage.getItem("@petlove:current_pet");
    const animalInfoJson = JSON.parse(animalInfo!);

    const endPoint = `${API_PATH}/vacinacao/byanimal/${animalInfoJson[0].id}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json());
    setVaccination(response);
  }

  async function getAnimalDocuments() {
    const animalInfo = await AsyncStorage.getItem("@petlove:current_pet");
    const animalInfoJson = JSON.parse(animalInfo!);

    const endPoint = `${API_PATH}/documentos/byanimal/${animalInfoJson[0].id}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json());
    setDocument(response);
  }

  function dateSqlToBrl(data: string) {
    var ano = data.split("-")[0];
    var mes = data.split("-")[1];
    var dia = data.split("-")[2];

    return ("0" + dia).slice(-2) + '/' + ("0" + mes).slice(-2) + '/' + ano;
  }

  useEffect(() => {
    getAnimalInfo();
    getAnimalVaccinations();
    getAnimalDocuments();
  }, []);


  if (!animal || !vaccination || !document) {
    return <AppLoading />
  }

  const docPath = `${API_PATH}/public/documentos/`;
  return (
    <Container>
      <Header title="Informações gerais" />

      <ContentWrapper showsVerticalScrollIndicator={false}>
        <Title title="Geral" icon="home" />

        <InfoCard>
          <Row>
            <TextBold>Nome:</TextBold>
            <TextRegular>{animal[0].nome}</TextRegular>
          </Row>

          <Row>
            <TextBold>Dono:</TextBold>
            <TextRegular>{animal[0].dono}</TextRegular>
          </Row>

          <Row>
            <TextBold>Nascimento:</TextBold>
            <TextRegular>{animal[0].nascimento}</TextRegular>
          </Row>

          <Row>
            <TextBold>Sexo:</TextBold>
            <TextRegular>{animal[0].sexo}</TextRegular>
          </Row>

          <Row>
            <TextBold>Tipo:</TextBold>
            <TextRegular>{animal[0].tipo_animal}</TextRegular>
          </Row>

          <Row>
            <TextBold>Raça:</TextBold>
            <TextRegular>{animal[0].animal_raca}</TextRegular>
          </Row>

          <Row>
            <TextBold>Comportamento:</TextBold>
            <TextRegular>{animal[0].animal_comportamento}</TextRegular>
          </Row>
        </InfoCard>

        <Title title="Vacinação" icon="check-square" />

        {
          vaccination!.map((item, index) => (
            <VaccinationCard
              key={item.id}
              date={dateSqlToBrl(item.data_aplicacao)}
              title={item.descVacina}
              state={item.status}
            />
          ))
        }

        {
          vaccination!.length === 0 && (<Text>Nenhuma vacina cadastrada</Text>)
        }

        <Title title="Documentos" icon="folder" />

        {
          document!.map((item, index) =>
            (
              <DocumentCard
                key={item.id}
                description={item.descricao}
                date={dateSqlToBrl(item.data)}
                notes={item.notas}
                file_path={item.file_path === "" ? " " : docPath + item.file_path}
              />
            )
          )
        }

        <View style={{ height: 60 }}></View>
      </ContentWrapper>
    </Container>
  );
}