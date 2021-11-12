import React from "react";

import {
  Container,
  LogoWrapper,
  Logo,
  FormWrapper,
  OptionsWrapper,
  OptionButton,
  OptionButtonText
} from "./styles";

import { InputText } from "../../components/form/InputText";
import { Button } from "../../components/form/Button";

export function SignIn() {
  return (
    <Container>
      <LogoWrapper>
        <Logo source={require("../../assets/logo.png")} style={{ width: 180, height: 40 }} />
      </LogoWrapper>

      <FormWrapper>
        <InputText title="E-mail" />
        <InputText title="Senha" secureTextEntry={true} />
        <Button title="Entrar" />

        <OptionsWrapper>
          <OptionButton>
            <OptionButtonText>Cadastrar</OptionButtonText>
          </OptionButton>

          <OptionButton>
            <OptionButtonText>Esqueci a senha</OptionButtonText>
          </OptionButton>
        </OptionsWrapper>
      </FormWrapper>
    </Container>
  );
}