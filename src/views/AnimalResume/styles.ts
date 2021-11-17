import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const ContentWrapper = styled.ScrollView`
  width: 100%;
  padding: 25px;
  flex-grow: 1;
`;

export const InfoCard = styled.View`
  margin: 15px 0;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary_light};
  padding: 15px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const TextBold = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 10px;
`;

export const TextRegular = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  margin-bottom: 15px;
`;