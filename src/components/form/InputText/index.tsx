import React from "react";
import { TextInputProps } from "react-native";
import { Container } from "./styles";

interface InputProps extends TextInputProps {
  title: string;
}

export function InputText({ title, ...rest }: InputProps) {
  return (
    <Container placeholder={title} {...rest} />
  );
}