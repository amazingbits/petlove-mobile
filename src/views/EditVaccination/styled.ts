import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(130)}px;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(16)}px;
  padding: 15px;
`;

export const FormWrapper = styled.View`
  padding: 25px;
`;

export const Card = styled.View`
  padding: 25px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary_light};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

export const TextBold = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  margin-right: 12px;
`;

export const TextNormal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
`;