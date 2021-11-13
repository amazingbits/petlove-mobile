import React from "react";

import {
  Wrapper,
  Container,
  Icon
} from "./styles";

interface Props {
  onPress(): void;
}

export function NewBtn({ onPress }: Props) {
  return (
    <Wrapper >
      <Container onPress={onPress}>
        <Icon name="plus" size={25} />
      </Container>
    </Wrapper>
  );
}