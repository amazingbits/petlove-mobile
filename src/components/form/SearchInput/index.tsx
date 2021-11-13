import React from "react";
import { TextInputProps } from "react-native";

import {
  Container,
  Text,
  SearchButton,
  SearchIcon
} from "./styles";

interface Props extends TextInputProps {
  onPress(): void;
  title: string;
}

export function SearchInput({ onPress, title, ...rest }: Props) {
  return (
    <Container>
      <Text placeholder={title} {...rest} />
      <SearchButton onPress={onPress}>
        <SearchIcon name="search" size={24} />
      </SearchButton>
    </Container>
  );
}