import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Header,
  Title,
  FormWrapper
} from "./styles";
import { InputText } from "../../components/form/InputText";
import { Button } from "../../components/form/Button";
import { API_PATH } from "@env";
import { Alert } from "react-native";
import { Loading } from "../../components/Loading";

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const Navigation = useNavigation();

  async function sendEmail() {
    setIsLoading(true);
    if (email.trim().length === 0) {
      return Alert.alert("Insira um e-mail");
    }

    const endPoint = `${API_PATH}/forgotpassword/${email}`;
    const response = await fetch(endPoint, { method: "GET" })
      .then(response => response.json());

    if (Number(response.status) === 200) {
      setEmail("");
      Navigation.goBack();
    }

    Alert.alert(response.message);
    setIsLoading(false);

  }

  return (
    <Container>
      <Header>
        <Title>Recuperar senha</Title>
      </Header>

      <FormWrapper>
        <InputText title="E-mail" value={email} onChangeText={setEmail} />
        <Button title="Enviar e-mail" onPress={sendEmail} />
      </FormWrapper>

      {
        isLoading && (
          <Loading />
        )
      }
    </Container>
  );
}