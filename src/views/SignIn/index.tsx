import React, { useState } from "react";
import { Alert } from "react-native";

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

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_PATH } from "@env";

interface UserDataProps {
  email: string;
  senha: string;
}

export function SignIn() {

  const { navigate } = useNavigation();
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userData, setUserData] = useState<UserDataProps>({} as UserDataProps);

  async function handleUserLogin() {

    if (userLogin.trim().length === 0) {
      return Alert.alert("Você precisa informar um e-mail!");
    }

    if (userPassword.trim().length === 0) {
      return Alert.alert("Você precisa informar uma senha!");
    }

    const userData = {
      email: userLogin,
      senha: userPassword
    };
    setUserData(userData);

    const endPoint = `${API_PATH}/auth/loginbyapp`;

    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(response => {
      return response.json();
    }).catch(error => {
      console.log(error);
      return error.json();
    });

    if (response.id === undefined) {
      Alert.alert(response.message);
      return;
    } else {
      //usuário logou com sucesso
      const dataKey = "@petlove:user";
      await AsyncStorage.setItem(dataKey, JSON.stringify(response));
      Alert.alert("Usuário logado com sucesso!");
      navigate("Home");
    }
  }

  return (
    <Container>
      <LogoWrapper>
        <Logo source={require("../../assets/logo.png")} style={{ width: 180, height: 40 }} />
      </LogoWrapper>

      <FormWrapper>
        <InputText title="E-mail" value={userLogin} onChangeText={setUserLogin} />
        <InputText title="Senha" secureTextEntry={true} value={userPassword} onChangeText={setUserPassword} />
        <Button title="Entrar" onPress={handleUserLogin} />

        <OptionsWrapper>
          <OptionButton>
            <OptionButtonText onPress={() => navigate("SignUp")}>Cadastrar</OptionButtonText>
          </OptionButton>

          <OptionButton>
            <OptionButtonText onPress={() => navigate("ForgotPassword")}>Esqueci a senha</OptionButtonText>
          </OptionButton>
        </OptionsWrapper>
      </FormWrapper>
    </Container>
  );
}