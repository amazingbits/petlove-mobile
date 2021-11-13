import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View``;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(140)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-items: center;
`;

export const UserMainWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  margin-top: ${RFValue(40)}px;
`;

export const Greetings = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const LogoutButtonIcon = styled(Feather)``;

export const SearchInputWrapper = styled.View`
  padding: 10px 24px;
`;

export const CompaniesWrapper = styled.FlatList`
  padding: 0 25px 50px;
  margin: 0 0 20px;
  height: ${RFPercentage(66)}px;
`;