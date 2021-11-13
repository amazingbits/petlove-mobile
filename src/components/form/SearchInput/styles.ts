import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 21px 24px;
  border-radius: 10px;
`;

export const Text = styled.TextInput`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_light};
  font-size: ${RFValue(15)}px;
  width: 90%;
`;

export const SearchButton = styled(BorderlessButton)``;

export const SearchIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_light};
`;