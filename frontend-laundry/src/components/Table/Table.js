import React from 'react';
import { Container } from '../../globalStyles';
import { TableSec, InfoColumn, TextWrapper, Title, BottomLine } from './TableElements';

const Table = ({lightBg, lightTitle, lightBottomLine, title, bottomLine}) => {

  return (
    <>
    <TableSec lightBg={lightBg}>
        <Container>
            <InfoColumn>
                <TextWrapper>
                    <Title lightTitle={lightTitle}>{title}</Title>
                    <BottomLine lightBottomLine={lightBottomLine}>{bottomLine}</BottomLine>
                </TextWrapper>
            </InfoColumn>
        </Container>
    </TableSec>
    </>
  )
}

export default Table