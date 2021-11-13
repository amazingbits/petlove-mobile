import React from "react";

import {
  Container,
  CompanyIcon,
  CompanyInfo,
  CompanyName,
  CompanyPhone,
  PhoneIcon,
  PhoneText,
  Separator
} from "./styles";

interface CompanyProps {
  id: string;
  photo: string;
  name: string;
  phone: string;
  street: string;
  number: string;
}

export function CompanyCard({ id, photo, name, phone, street, number }: CompanyProps) {
  return (
    <Container>
      <CompanyInfo>
        <CompanyIcon source={{
          uri: photo,
          width: 50,
          height: 50
        }} />
        <CompanyName>{name}</CompanyName>
      </CompanyInfo>
      <Separator />
      <CompanyPhone>
        <PhoneIcon name="home" size={20} />
        <PhoneText>{street}, {number}</PhoneText>
      </CompanyPhone>
      <CompanyPhone>
        <PhoneIcon name="phone" size={20} />
        <PhoneText>{phone}</PhoneText>
      </CompanyPhone>
    </Container>
  );
}