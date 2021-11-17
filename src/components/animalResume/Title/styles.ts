import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  transform: translateY(5px);
  color: ${({ theme }) => theme.colors.primary};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 12px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 15px 0;
`;