import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${RFValue(90)}px;
  background: ${({ theme }) => theme.colors.primary};
  padding: 0 25px;
`;

export const Btn = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(16)}px;
`;