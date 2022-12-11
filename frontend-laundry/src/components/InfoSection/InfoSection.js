import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../../globalStyles';
import {InfoSec, InfoRow, InfoColumn, TextWrapper, TopLine, Heading, Subtittle, ImgWrapper, Img} from './InfoSectionElement';

const InfoSection = ({ primary, lightBg, imgStart, lightTopLine, lightTextDesc, buttonLabel, description, headLine, lightText, topLine, img, alt, start }) => {
  return (
    <>
    <InfoSec lightBg={lightBg}>
      <Container>
        <InfoRow imgStart={imgStart}>
          <InfoColumn>
            <TextWrapper>
              {/* <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine> */}
              <Heading lightText={lightText}>{headLine}</Heading>
              <Subtittle lightTextDesc={lightTextDesc}>{description}</Subtittle>
              <Link to='/paket'>
                <Button big fontBig primary={primary}>
                  {buttonLabel}
                </Button>
              </Link>
            </TextWrapper>
          </InfoColumn>
          <InfoColumn>
            <ImgWrapper start={start}>
              <Img src={img} alt={alt} />
            </ImgWrapper>
          </InfoColumn>
        </InfoRow>
      </Container>
    </InfoSec>
    </>
  )
}

export default InfoSection
