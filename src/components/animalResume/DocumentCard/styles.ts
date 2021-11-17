import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary_light};
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 25px 15px;
  border-radius: 10px;
  margin: 20px 0;
`;

export const TitleWrapper = styled.View`
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ContentWrapper = styled.View`
  margin-bottom: 15px;
`;

export const Content = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const BottomWrapper = styled.View`
  margin: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FileBtn = styled(BorderlessButton)`
  color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;