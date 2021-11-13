import styled from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.colors.text_light};
  margin: 10px 0;
  border-radius: 10px;
`;

export const CompanyInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const CompanyIcon = styled.Image`
  margin-right: 10px;
  border-radius: 10px;
`;

export const CompanyName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text_light};
  margin: 18px 0;
`;

export const CompanyPhone = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
`;

export const PhoneIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_light};
  margin-right: 12px;
`;

export const PhoneText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;