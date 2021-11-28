import React, { useState } from "react";
import { Alert } from "react-native";

import {
  Container,
  Header,
  Title,
  FormWrapper,
} from "./styles";

import { Masks } from "react-native-mask-input";
import { InputText } from "../../components/form/InputText";
import { MaskedInput } from "../../components/form/MaskedInput";
import { Button } from "../../components/form/Button";
import { Loading } from "../../components/Loading";

import { useNavigation } from "@react-navigation/native";

import { API_PATH } from "@env";

interface NewUserProps {
  name: string;
  password: string;
  email: string;
  phone: string;
  path_url: string;
  user_type: number;
}

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRPassword, setUserRPassword] = useState('');
  const [userParams, setUserParams] = useState<NewUserProps>({} as NewUserProps);

  const { navigate } = useNavigation();

  async function handleSaveNewUser() {
    setIsLoading(true);
    const endPoint = `${API_PATH}/usuario/newUserByApp`;

    if (userPassword !== userRPassword) {
      return Alert.alert("As senhas não conferem!");
    }

    const userParams = {
      name: userName,
      password: userPassword,
      email: userEmail,
      phone: userPhone,
      path_url: "",
      user_type: 1
    };
    setUserParams(userParams);

    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userParams)
    }).then(response => response.json()
    ).catch(error => {
      console.log(error);
      return undefined;
    });

    setIsLoading(false);

    if (response === undefined) {
      return Alert.alert("Houve um problema ao cadastrar usuário!");
    }

    console.log(response);
    if (response.status !== 201) {
      return Alert.alert(response.message);
    }

    //usuário cadastrado com sucesso!
    Alert.alert(response.message);
    navigate("SignIn");

  }

  return (
    <Container>
      <Header>
        <Title>Cadastrar usuário</Title>
      </Header>

      <FormWrapper>
        <InputText title="Nome" value={userName} onChangeText={setUserName} />
        <InputText title="E-mail" value={userEmail} onChangeText={setUserEmail} />
        <MaskedInput value={userPhone} onChangeText={setUserPhone} mask={Masks.BRL_PHONE} placeholder="Telefone" />
        <InputText title="Senha" secureTextEntry={true} value={userPassword} onChangeText={setUserPassword} />
        <InputText title="Repetir senha" secureTextEntry={true} value={userRPassword} onChangeText={setUserRPassword} />
        <Button title="Cadastrar" onPress={handleSaveNewUser} />
      </FormWrapper>

      {isLoading && <Loading />}
    </Container>
  );
}