import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  padding: 2px;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

export const Btn = styled(RectButton)`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(MaterialIcons)`
  margin-right: 12px;
  opacity: 0.8;
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;