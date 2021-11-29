import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  flex: 1;
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

export const File = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
`;

export const FileText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FileSuccessCard = styled.View`
  margin: 15px 0;
  border: 2px solid ${({ theme }) => theme.colors.succcess};
  background-color: ${({ theme }) => theme.colors.success_light};
  padding: 10px;
`;

export const FileSuccessText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.succcess};
`;