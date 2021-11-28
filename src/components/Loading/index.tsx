import React from 'react';

import {
  Container,
  DogImage
} from './styles';

export function Loading() {
  return (
    <Container>
      <DogImage source={require("../../assets/dog-walking.gif")} />
    </Container>
  );
}