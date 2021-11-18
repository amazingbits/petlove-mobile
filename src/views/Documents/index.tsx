import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_PATH } from "@env";

import {
  Container,
  ListWrapper,
  List,
  ListItem,
  ListItemBtn,
  ListItemText
} from "./styles";
import { Header } from "../../components/Header";
import { NewBtn } from "../../components/NewBtn";

export function Documents() {

  const { navigate } = useNavigation();
  const [documents, setDocuments] = useState([]);

  async function getDocumentList() {
    const currentPet = await AsyncStorage.getItem("@petlove:current_pet");
    const currentPetJson = JSON.parse(currentPet!);
    const petId = Number(currentPetJson[0].id);


    const endPoint = `${API_PATH}/documentos/byanimal/${petId}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json());

    setDocuments(response);
  }

  async function goToDocumentUpdate(documentId: string) {
    await AsyncStorage.setItem("@petlove:document_to_edit", documentId);
    navigate("EditDocument");
  }

  useFocusEffect(
    useCallback(() => {
      getDocumentList();
    }, [])
  );

  return (
    <Container>
      <Header title="Documentos" />

      <ListWrapper>
        <List
          data={documents}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem>
              <ListItemBtn onPress={() => goToDocumentUpdate(item.id)}>
                <ListItemText>{item.descricao}</ListItemText>
              </ListItemBtn>
            </ListItem>
          )}
        />
      </ListWrapper>

      <NewBtn onPress={() => { navigate("NewDocument") }} />
    </Container>
  );
}