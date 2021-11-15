import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Picker } from "@react-native-picker/picker";

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

export const SelectItemView = styled.View`
  padding: 10px 24px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  margin-bottom: 22px;
`;

export const SelectItem = styled(Picker)``;