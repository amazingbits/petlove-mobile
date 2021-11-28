import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
 flex: 1;
 position: absolute;
 width: 100%;
 height: 50px;
 z-index: 99;
 top: 50%;
 justify-content: center;
 align-items: center;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;