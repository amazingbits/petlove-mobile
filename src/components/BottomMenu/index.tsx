import React from "react";

import {
  Container,
  Title,
  Btn,
  Icon
} from "./styles";

import { useNavigation } from "@react-navigation/native";

export function BottomMenu() {
  const { navigate } = useNavigation();
  return (
    <Container>
      {/* <Btn onPress={() => navigate("Home")}>
        <Icon name="home" size={24} />
        <Title>Início</Title>
      </Btn> */}

      <Btn onPress={() => navigate("Pets")}>
        <Icon name="gitlab" size={24} />
        <Title>Pets</Title>
      </Btn>
    </Container>
  );
}