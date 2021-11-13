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

export const FormWrapper = styled.ScrollView`
  width: 100%;
  padding: 50px 25px;
`;