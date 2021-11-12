import styled from 'styled-components/native';
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  width: 100%;
  flex: 1;  
`;

export const LogoWrapper = styled.View`
  width: 100%;
  align-items: center;
  margin: ${RFValue(80)}px 0 ${RFValue(20)}px;
`;

export const Logo = styled.Image``;

export const FormWrapper = styled.View`
  padding: 20px;
  margin: 20px 0;
`;

export const OptionsWrapper = styled.View`
  width: 100%;
  margin: 25px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const OptionButton = styled(RectButton)`
  padding: 10px;
`;

export const OptionButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;