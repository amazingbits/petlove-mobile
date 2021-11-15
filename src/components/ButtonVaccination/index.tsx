import React from "react";

import {
  Container,
  Btn,
  Icon,
  Title
} from "./styles";

interface ButtonProps {
  title: string;
  onPress(): void;
  background: string;
}

export function ButtonVaccination({
  title, background, onPress
}: ButtonProps) {
  return (
    <Container style={{
      backgroundColor: background
    }}>
      <Btn onPress={onPress}>
        <Icon name="chevron-right" size={30} />
        <Title>{title}</Title>
      </Btn>
    </Container>
  );
}