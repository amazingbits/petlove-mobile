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

export const ButtonWrapper = styled.View`
  margin: 10px 0;
  padding: 25px;
`;

export const ResumeWrapper = styled.View`
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;

export const DogImage = styled.Image`
  margin: 10px 0 20px;
`;

export const DogCard = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary_light};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

export const CardInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  text-transform: uppercase;
`;