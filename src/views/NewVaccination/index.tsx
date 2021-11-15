import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { API_IP, API_ENDPOINT } from "@env";

import { Masks } from "react-native-mask-input";
import {
  Container,
  Header,
  Title,
  FormWrapper,
  SelectItemView,
  SelectItem
} from "./styles";
import { MaskedInput } from "../../components/form/MaskedInput";
import { Button } from "../../components/form/Button";

export function NewVaccination() {
  const [vaccine, setVaccine] = useState("");
  const [date, setDate] = useState("");
  const [pet, setPet] = useState([]);
  const Navigation = useNavigation();

  function limparFormulario() {
    setDate("");
    setVaccine("0");
  }

  async function getPetInformation() {
    const dataKey = "@petlove:current_pet";
    const currentPet = await AsyncStorage.getItem(dataKey);
    setPet(JSON.parse(currentPet!));
  }

  function FormataStringData(data: string) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
  }

  async function saveVaccine() {
    const vac = Number(vaccine);

    if (vac === 0) {
      return Alert.alert("Selecione uma vacina!");
    }

    if (date.trim().length !== 10) {
      return Alert.alert("Entre com uma data válida!");
    }

    const dateVac = FormataStringData(date);
    const petId = Number(pet[0].id);
    const data = {
      animal: petId,
      vacina: vac,
      data_aplicacao: dateVac
    };

    const endPoint = `http://${API_IP}${API_ENDPOINT}/vacinacao/save`;

    const response = await fetch(endPoint, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(response => response.json());

    if (Number(response.status) === 201) {
      const newEndPoint = `http://${API_IP}${API_ENDPOINT}/vacinacao/byanimal/${petId}`;
      const newList = await fetch(newEndPoint, { method: "GET" })
        .then(response => response.json());
      const dataKey = "@petlove:current_pet_vaccination";
      AsyncStorage.setItem(dataKey, JSON.stringify(newList));
      limparFormulario();
      Navigation.goBack();
    }

    return Alert.alert(response.message);
  }

  useFocusEffect(
    useCallback(() => {
      getPetInformation();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Cadastrar vacinação</Title>
      </Header>

      <FormWrapper>
        <SelectItemView>
          <SelectItem
            selectedValue={vaccine}
            onValueChange={(itemValue, itemIndex) => {
              setVaccine(String(itemValue));
            }}
          >
            <SelectItem.Item label="Selecione a vacina" value="0" />
            <SelectItem.Item label="Antirrábica (cachorros)" value="1" />
            <SelectItem.Item label="Polivalente (V8 e V10)" value="2" />
            <SelectItem.Item label="Giardíase" value="3" />
            <SelectItem.Item label="Gripe Canina" value="4" />
            <SelectItem.Item label="Leishmaniose" value="5" />
          </SelectItem>
        </SelectItemView>

        <MaskedInput
          value={date}
          onChangeText={setDate}
          mask={Masks.DATE_DDMMYYYY}
          placeholder="Selecione a data"
          keyboardType="numeric"
        />

        <Button title="Cadastrar" onPress={saveVaccine} />
      </FormWrapper>
    </Container>
  );
}