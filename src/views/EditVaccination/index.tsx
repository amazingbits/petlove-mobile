import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_PATH } from "@env";
import { Masks } from "react-native-mask-input";

import {
  Container,
  FormWrapper,
  Card,
  Row,
  TextBold,
  TextNormal
} from "./styled";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaskedInput } from "../../components/form/MaskedInput";
import { Button } from "../../components/form/Button";
import { Alert } from "react-native";
import { Header } from "../../components/Header";

interface VaccinationProps {
  id: number;
  animal: number;
  vacina: number;
  data_aplicacao: string;
  data_aplicacao_brl: string;
  descVacina: string;
  nomeAnimal: string;
}

export function EditVaccination() {

  const [vaccinationInfo, setVaccinationInfo] = useState<VaccinationProps>({} as VaccinationProps);
  const [date, setDate] = useState("");
  const Navigation = useNavigation();

  async function getVaccinationInfo() {
    const dataKey = "@petlove:current_vaccination_to_edit";
    const currentVaccine = await AsyncStorage.getItem(dataKey);
    const endPoint = `${API_PATH}/vacinacao/byid/${currentVaccine}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json());

    setVaccinationInfo(response);
  }

  function FormataStringData(data: string) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
  }

  async function edit() {
    const endPoint = `${API_PATH}/vacinacao/update/${vaccinationInfo.id}`;
    if (date.trim().length !== 10) {
      return Alert.alert("Entre com uma data válida!");
    }
    const params = {
      data_aplicacao: FormataStringData(date)
    };

    const response = await fetch(endPoint, {
      method: "PUT",
      body: JSON.stringify(params)
    }).then(response => response.json());

    if (Number(response.status) === 200) {

      //pegar o ID do pet atual
      const currentPet = await AsyncStorage.getItem("@petlove:current_pet");
      const currentPetJson = JSON.parse(currentPet!);
      const petId = currentPetJson[0].id;

      const newEndPoint = `${API_PATH}/vacinacao/byanimal/${petId}`;
      const newList = await fetch(newEndPoint, { method: "GET" })
        .then(response => response.json());

      await AsyncStorage.setItem("@petlove:current_pet_vaccination", JSON.stringify(newList));

      setDate("");
      Navigation.goBack();
    }

    return Alert.alert(response.message);
  }

  async function removeAlert() {
    Alert.alert("Atenção!", "Tem certeza que deseja remover este registro?", [
      {
        text: "Sim",
        onPress: () => {
          removeRegister();
        }
      },
      {
        text: "Não",
        onPress: () => { }
      },
    ]);

  }

  async function removeRegister() {
    const vaccineId = vaccinationInfo.id;
    const animalId = vaccinationInfo.animal;

    const endPoint = `${API_PATH}/vacinacao/delete/${vaccineId}`;
    const response = await fetch(endPoint, { method: "DELETE" })
      .then(response => response.json());

    if (Number(response.status) === 200) {

      const newEndPoint = `${API_PATH}/vacinacao/byanimal/${animalId}`;
      const newList = await fetch(newEndPoint, { method: "GET" })
        .then(response => response.json());

      await AsyncStorage.setItem("@petlove:current_pet_vaccination", JSON.stringify(newList));

      setDate("");
      Navigation.goBack();

    }
    console.log(response);
  }

  useFocusEffect(
    useCallback(() => {
      getVaccinationInfo();
    }, [])
  );

  useEffect(() => {
    getVaccinationInfo();
  }, []);

  return (
    <Container>
      <Header title="Alterar data da vacinação" />

      <FormWrapper>
        <Card>
          <Row>
            <TextBold>Vacina:</TextBold>
            <TextNormal>{vaccinationInfo.descVacina}</TextNormal>
          </Row>

          <Row>
            <TextBold>Animal:</TextBold>
            <TextNormal>{vaccinationInfo.nomeAnimal}</TextNormal>
          </Row>

          <Row>
            <TextBold>Última aplicação:</TextBold>
            <TextNormal>{vaccinationInfo.data_aplicacao_brl}</TextNormal>
          </Row>
        </Card>

        <MaskedInput
          value={date}
          onChangeText={setDate}
          mask={Masks.DATE_DDMMYYYY}
          placeholder="Nova data de aplicação"
          keyboardType="numeric"
        />

        <Button title="Salvar" onPress={edit} />
        <Button title="Excluir" onPress={removeAlert} />
      </FormWrapper>
    </Container>
  );
}