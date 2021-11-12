import React from "react";

import {
  Container,
  LogoWrapper,
  Logo
} from "./styles";

export function SignIn() {
  return (
    <Container>
      <LogoWrapper>
        <Logo source={require("../../assets/logo.png")} style={{ width: 180, height: 40 }} />
      </LogoWrapper>
    </Container>
  );
}