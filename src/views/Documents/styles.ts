import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;

export const ListWrapper = styled.View`
  padding: 25px;
`;

export const List = styled.FlatList``;

export const ListItem = styled.View`
  padding: 2px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
`;

export const ListItemBtn = styled(RectButton)`
  width: 100%;
  padding: 10px;
`;

export const ListItemText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;