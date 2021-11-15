import React from "react";
import { useTheme } from "styled-components";

import {
  Container,
  Button,
  Icon,
  Title
} from "./styles";

interface BtnProps {
  title: string;
  iconName?: string;
  backgroundColor?: string;
  onPress(): void;
}

export function PetButton({
  title,
  iconName,
  backgroundColor,
  onPress
}: BtnProps) {
  const theme = useTheme();
  return (
    <Container style={{
      backgroundColor: backgroundColor ? backgroundColor : theme.colors.primary
    }}>
      <Button onPress={onPress}>
        <Icon name={iconName ? iconName : 'chevron-right'} size={35} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}