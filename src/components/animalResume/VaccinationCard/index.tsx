import React from "react";
import { useTheme } from "styled-components";

import {
  Container,
  Text
} from "./styles";

interface Props {
  title: string;
  date: string;
  state: string;
}

export function VaccinationCard({ title, date, state }: Props) {
  const theme = useTheme();
  return (
    <Container style={{
      backgroundColor: state === "ok" ? theme.colors.success_light : theme.colors.danger_light,
      borderColor: state === "ok" ? theme.colors.succcess : theme.colors.danger,
      borderWidth: 3,
      borderRadius: 10
    }}>
      <Text style={{
        color: state === "ok" ? theme.colors.succcess : theme.colors.danger
      }}>{title}</Text>

      <Text style={{
        color: state === "ok" ? theme.colors.succcess : theme.colors.danger
      }}>{date}</Text>

    </Container>
  );
}