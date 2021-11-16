import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 80px 25px 20px;
`;

export const BtnContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Btn = styled(BorderlessButton)``;

export const IconBtn = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.8;
`;

export const BottomContent = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.secondary};
`;
