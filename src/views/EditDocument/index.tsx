import React, { useState, useCallback } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as DocumentPicker from 'expo-document-picker';
import { API_PATH } from "@env";

import { Masks } from "react-native-mask-input";
import { Header } from "../../components/Header";
import {
  Container,
  FormContainer,
  File,
  FileText
} from "./styles";
import { InputText } from "../../components/form/InputText";
import { MaskedInput } from "../../components/form/MaskedInput";
import { Button } from "../../components/form/Button";
import { Alert } from "react-native";
import { FileSuccessCard, FileSuccessText } from "../NewDocument/styles";

export function EditDocument() {

  const [document, setDocument] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [animal, setAnimal] = useState("");
  const [file, setFile] = useState("");
  const [fileIsLoaded, setFileIsLoaded] = useState(false);

  const Navigation = useNavigation();

  function dateSqlToBrl(data: string) {
    var ano = data.split("-")[0];
    var mes = data.split("-")[1];
    var dia = data.split("-")[2];

    return ("0" + dia).slice(-2) + '/' + ("0" + mes).slice(-2) + '/' + ano;
  }

  function dateBrlToSql(data: string) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
  }

  async function getDocument() {
    const currentDocument = await AsyncStorage.getItem("@petlove:document_to_edit");

    const endPoint = `${API_PATH}/documentos/byid/${currentDocument}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json());

    setDocument(String(currentDocument));
    setAnimal(response.animal);
    setDescription(response.descricao);
    setDate(dateSqlToBrl(response.data));
    setNotes(response.notas);
  }

  function showAlertDialog() {
    Alert.alert("Atenção!", "Tem certeza que deseja excluir este documento?", [
      {
        text: "Sim",
        onPress: deleteDocument
      },
      {
        text: "Não",
        onPress: () => { }
      }
    ]);
  }

  async function deleteDocument() {
    const endPoint = `${API_PATH}/documentos/delete/${document}`;
    const response = await fetch(endPoint, { method: "DELETE" })
      .then(response => response.json());

    if (Number(response.status) === 200) {
      Navigation.goBack();
    }

    Alert.alert(response.message);
  }

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
      setFileIsLoaded(true);
    }
  }

  async function save() {

    if (description.trim().length === 0) {
      return Alert.alert("Entre com uma descrição");
    }

    if (date.trim().length !== 10) {
      return Alert.alert("Entre com uma data válida!");
    }

    const endPoint = `${API_PATH}/documentos/update/${document}`;
    const doc = new FormData();

    if (file !== "") {
      doc.append("file", {
        uri: file.uri,
        type: "application/pdf",
        name: file.name
      });
    }

    doc.append("descricao", description);
    doc.append("data", dateBrlToSql(date));
    doc.append("animal", animal);
    doc.append("notas", notes);

    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: doc
    }).then(response => response.json());

    if (Number(response.status) === 200) {
      setDescription("");
      setDate("");
      setNotes("");
      setFile("");
      Navigation.goBack();
    }

    Alert.alert(response.message);
  }

  useFocusEffect(
    useCallback(() => {
      getDocument();
    }, [])
  );

  return (
    <Container>
      <Header title="Editar documento" />

      <FormContainer showsVerticalScrollIndicator={false}>
        <InputText title="Descrição" value={description} onChangeText={setDescription} />

        <MaskedInput
          value={date}
          onChangeText={setDate}
          mask={Masks.DATE_DDMMYYYY}
          placeholder="Data"
        />

        <InputText title="Notas" value={notes} onChangeText={setNotes} />

        <File onPress={getFile}>
          <FileText>Alterar Arquivo</FileText>
        </File>

        {fileIsLoaded &&
          <FileSuccessCard>
            <FileSuccessText>Documento inserido!</FileSuccessText>
          </FileSuccessCard>
        }

        <Button title="Salvar" onPress={save} />
        <Button title="Excluir" onPress={showAlertDialog} />

      </FormContainer>
    </Container>
  );
}