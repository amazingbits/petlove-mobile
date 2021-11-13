import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Wrapper = styled.View`
  position: absolute;
  z-index: 99;
  right: 15px;
  bottom: 15px;
`;

export const Container = styled(BorderlessButton).attrs({
  borderRadius: 50
})`
  width: 75px;
  height: 75px;
  padding: 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary}
`;