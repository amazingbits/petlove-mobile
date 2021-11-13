import React from "react";

import { MaskInputProps } from 'react-native-mask-input';
import { Container } from "./styles";

export function MaskedInput({ ...rest }: MaskInputProps) {

  return (
    <Container {...rest} />
  );
}