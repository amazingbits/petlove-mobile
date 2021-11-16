import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  BtnContent,
  Btn,
  IconBtn,
  BottomContent,
  Title,
} from "./styles";

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const Navigation = useNavigation();
  return (
    <Container>
      <BtnContent>
        <Btn onPress={Navigation.goBack}>
          <IconBtn name="chevron-left" size={28} />
        </Btn>

        <Btn onPress={() => { Navigation.reset({ index: 0, routes: [{ name: "Home" }] }) }}>
          <IconBtn name="home" size={28} />
        </Btn>
      </BtnContent>

      <BottomContent>
        <Title>{title}</Title>
      </BottomContent>
    </Container>
  );
}