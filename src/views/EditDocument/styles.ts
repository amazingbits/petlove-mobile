import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const FormContainer = styled.ScrollView`
  padding: 25px;
`;

export const File = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 40px;
`;

export const FileText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.primary};
`;