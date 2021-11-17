import React from "react";
import { Linking } from "react-native";

import {
  Container,
  BottomWrapper,
  Content,
  ContentWrapper,
  DateText,
  FileBtn,
  Icon,
  Title,
  TitleWrapper
} from "./styles";

interface Props {
  description: string;
  notes: string;
  date: string;
  file_path: string;
}

export function DocumentCard({
  description,
  notes,
  date,
  file_path
}: Props) {

  function openLink(link: string) {
    Linking.openURL(link);
  }

  return (
    <Container>
      <TitleWrapper>
        <Title>{description}</Title>
      </TitleWrapper>
      <ContentWrapper>
        <Content>{notes}</Content>
      </ContentWrapper>
      <BottomWrapper>
        <DateText>{date}</DateText>
        {
          file_path !== " " && (
            <FileBtn onPress={() => openLink(file_path)}>
              <Icon name="file" size={30} />
            </FileBtn>
          )
        }
      </BottomWrapper>
    </Container>
  );
}