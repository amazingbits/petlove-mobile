import React, { useState } from "react";
import { Masks } from "react-native-mask-input";
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_PATH } from "@env";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  FormWrapper,
  File,
  FileText
} from "./styles";
import { InputText } from "../../components/form/InputText";
import { MaskedInput } from "../../components/form/MaskedInput";
import { Button } from "../../components/form/Button"
import { Alert } from "react-native";
import { Header } from "../../components/Header";

interface FormDataProps {
  uri: string;
  name: string;
  type: string;
}

export function NewDocument() {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState("");

  const Navigation = useNavigation();

  async function getFile() {
    const sFile = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: "*/*"
    });

    if (sFile.type === 'cancel') {
      Alert.alert("Envio de arquivo cancelado pelo usuário...");
    }

    if (sFile.type === "success") {

      const expFileName = sFile.name.split(".");
      const extension = expFileName[expFileName.length - 1].toLowerCase().trim();

      if (extension !== "pdf") {
        return Alert.alert("A imagem precisa estar em PDF!");
      }

      if (sFile.size > 2000000) {
        return Alert.alert("O arquivo precisa ter menos de 2mb!");
      }

      setFile(sFile);
    }
  }

  async function save() {

    const currentPet = await AsyncStorage.getItem("@petlove:current_pet");
    const currentPetJson = JSON.parse(currentPet!);

    const petId = currentPetJson[0].id;

    if (description.trim().length === 0) {
      return Alert.alert("Entre com uma descrição");
    }

    if (date.trim().length !== 10) {
      return Alert.alert("Entre com uma data válida!");
    }

    const endPoint = `${API_PATH}/documentos/save`;
    const doc = new FormData();

    if (file !== "") {
      doc.append("file", {
        uri: file.uri,
        type: "application/pdf",
        name: file.name
      });
    }

    doc.append("descricao", description);
    doc.append("data", date);
    doc.append("animal", petId);
    doc.append("notas", notes);

    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: doc
    }).then(response => response.json());

    if (Number(response.status) === 201) {
      setDescription("");
      setDate("");
      setNotes("");
      setFile("");
      Navigation.goBack();
    }

    Alert.alert(response.message);
  }

  return (
    <Container>
      <Header title="Novo documento" />

      <FormWrapper>
        <InputText title="Descrição" value={description} onChangeText={setDescription} />
        <MaskedInput
          value={date}
          onChangeText={setDate}
          mask={Masks.DATE_DDMMYYYY}
          placeholder="Data"
        />
        <InputText title="Notas" value={notes} onChangeText={setNotes} />

        <File onPress={getFile}>
          <FileText>Selecionar Arquivo</FileText>
        </File>

        <Button title="Cadastrar" onPress={save} />
      </FormWrapper>

    </Container>
  );
}