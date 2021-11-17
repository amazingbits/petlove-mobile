import React from "react";

import {
  Container,
  Text,
  Icon,
  Separator
} from "./styles";

interface Props {
  title: string;
  icon: string;
}

export function Title({ title, icon }: Props) {
  return (
    <>
      <Container>
        <Icon name={icon} size={35} />
        <Text>{title}</Text>
      </Container>
      <Separator />
    </>
  );
}