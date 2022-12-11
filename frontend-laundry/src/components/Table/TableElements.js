import styled from 'styled-components'

export const TableSec = styled.div`
    color: #fff;
    padding: 20px 0;
    background: ${({ lightBg }) => (lightBg ? '#fff' : '#101522')};
`;

export const InfoColumn = styled.div`
    margin-bottom: 10px;
    padding-right: 10px;
    padding-left: 0px;
    flex: 1;
    max-width: 50%;
    flex-basis: 50%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

export const TextWrapper = styled.div`
    max-width: 560px;
    padding-top: 0;
    padding-bottom: 60x;

    @media screen and (max-width: 768px) {
        padding-bottom: 65px;
    }
`;

export const Title = styled.h1`
    margin-bottom: 12px;
    font-size: 20px;
    line-height: 1.1;
    color: ${({lightText}) => (lightText ? '#f7f8fa' : '#463f3a')};
`;

export const BottomLine = styled.div`
    color: ${({ lightTopLine }) => (lightTopLine ? '#f4f3ee' :'#bcb8b1')};
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 1.4px;
    margin-bottom: 10px;
`;

export const Tabel = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

export const Thead = styled.thead`
    /* border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px; */
`;

export const Tr = styled.tr`
    background-color: #fff;
    :hover{
        background-color: #e0afa0;
    }
`;

export const Th = styled.th`
    color: black;
    font-weight: bold;
    padding: 10px;
    border-bottom: 3px #bcb8b1 solid;
    text-align: left;
    padding: 8px;
`;

export const Td = styled.td`
    color: #8a817c;
    padding: 10px;
    border-bottom: 1px #bcb8b1 solid;
    text-align: left;
    padding: 8px;
`;