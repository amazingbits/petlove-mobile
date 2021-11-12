import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  padding: 21px;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
`;