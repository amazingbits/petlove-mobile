import styled from "styled-components/native";
import MaskInput from "react-native-mask-input";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(MaskInput)`
  padding: 21px 24px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  margin-bottom: 22px;
`;