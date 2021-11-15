import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 10px;
  padding: 2px;
  border-radius: 10px;
`;

export const Button = styled(RectButton)`
  width: 100%;
  padding: 10px 25px;
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.4;
  margin-right: 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(18)}px;
`;