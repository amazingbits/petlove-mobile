import React from "react";

import {
  Container,
  Title,
  Wrapper
} from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
  onPress(): void;
}

export function PetCard({ title, onPress, ...rest }: Props) {
  return (
    <Wrapper>
      <Container onPress={onPress} {...rest}>
        <Title>{title}</Title>
      </Container>
    </Wrapper>
  );
}