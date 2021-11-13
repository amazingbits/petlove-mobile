import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Header,
  Title,
  FormWrapper,
  SelectItem,
  SelectItemView,
} from "./styles";

import { InputText } from "../../components/form/InputText";
import { Masks } from "react-native-mask-input";
import { MaskedInput } from "../../components/form/MaskedInput";
import { Button } from "../../components/form/Button";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { API_IP, API_ENDPOINT } from "@env";

interface NewPetProps {
  sexo: string;
  nome: string;
  nascimento: string;
  castrado: number;
  animal_raca: number;
  animal_comportamento: number;
  tipo_animal: number;
  dono: number;
}

export function NewPet() {

  const [behavior, setBehavior] = useState("0");
  const [race, setRace] = useState("0");
  const [sex, setSex] = useState("0");
  const [birth, setBirth] = useState("");
  const [petName, setPetName] = useState("");

  const navigation = useNavigation();

  function limparFormulario() {
    setBehavior("0");
    setRace("0");
    setSex("0");
    setPetName("");
    setBirth("");
  }

  function FormataStringData(data: string) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
  }

  async function handleInsertNewPet() {

    const dataKey = "@petlove:user";
    const userText = await AsyncStorage.getItem(dataKey);
    const userTextJson = JSON.parse(userText!);
    const userId = userTextJson.id;

    if (petName.trim() === "") {
      return Alert.alert("Entre com um nome para o seu pet!");
    }

    if (sex === "0") {
      return Alert.alert("Selecione o sexo do seu animal!");
    }

    if (birth.trim().length !== 10) {
      return Alert.alert("Entre com uma data válida!");
    }

    if (behavior === "0") {
      return Alert.alert("Selecione o comportamento do seu animal!");
    }

    if (race === "0") {
      return Alert.alert("Selecione a raça do seu animal!");
    }

    const petData = {
      sexo: sex,
      nome: petName,
      nascimento: FormataStringData(birth),
      castrado: 1,
      animal_raca: Number(race),
      animal_comportamento: Number(behavior),
      tipo_animal: 1,
      dono: Number(userId)
    };

    const params = JSON.stringify(petData);
    const endPoint = `http://${API_IP}${API_ENDPOINT}/animal/save`;

    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    }).then(response => response.json());

    if (response.message !== undefined) {
      Alert.alert(response.message);
      if (response.message === "Registro inserido com sucesso!") {
        limparFormulario();
        navigation.goBack();
      }
    }
    console.log(response);

    console.log(petData);
  }

  return (
    <Container>
      <Header>
        <Title>Novo pet</Title>
      </Header>

      <FormWrapper>

        <InputText title="Nome" value={petName} onChangeText={setPetName} />

        <SelectItemView>
          <SelectItem
            selectedValue={sex}
            onValueChange={(itemValue, itemIndex) => {
              setSex(String(itemValue));
            }}
          >
            <SelectItem.Item label="Selecione o sexo" value="0" />
            <SelectItem.Item label="Macho" value="Macho" />
            <SelectItem.Item label="Fêmea" value="Fêmea" />
          </SelectItem>
        </SelectItemView>

        <MaskedInput value={birth} onChangeText={setBirth} mask={Masks.DATE_DDMMYYYY} placeholder="Data de nascimento" />

        <SelectItemView>
          <SelectItem
            selectedValue={behavior}
            onValueChange={(itemValue, itemIndex) => {
              setBehavior(String(itemValue));
            }}
          >
            <SelectItem.Item label="Selecione o comportamento" value="0" />
            <SelectItem.Item label="Dócil" value="1" />
            <SelectItem.Item label="Companheiro" value="2" />
            <SelectItem.Item label="Agitado" value="3" />
            <SelectItem.Item label="Bravo" value="4" />
          </SelectItem>
        </SelectItemView>

        <SelectItemView>
          <SelectItem
            selectedValue={race}
            onValueChange={(itemValue, itemIndex) => {
              setRace(String(itemValue));
            }}
          >
            <SelectItem.Item label="Selecione a raça" value="0" />
            <SelectItem.Item label="Akita" value="1" />
            <SelectItem.Item label="Basset Hound" value="2" />
            <SelectItem.Item label="Beagle" value="3" />
            <SelectItem.Item label="Bichon Frisé" value="4" />
            <SelectItem.Item label="Boiadeiro Australiano" value="5" />
            <SelectItem.Item label="Vira-lata" value="48" />
          </SelectItem>
        </SelectItemView>

        <Button title="Cadastrar" onPress={handleInsertNewPet} />

      </FormWrapper>
    </Container>
  );
}