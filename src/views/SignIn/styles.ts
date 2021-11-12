import styled from 'styled-components/native';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  flex: 1;  
`;

export const LogoWrapper = styled.View`
  width: 100%;
  align-items: center;
  margin: ${RFValue(50)}px 0 ${RFValue(20)}px;
`;

export const Logo = styled.Image``;