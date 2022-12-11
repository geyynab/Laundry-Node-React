import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', sans-serif;
}
`;

export const Container = styled.div`
z-index: 1;
width: 100%;
max-width: 1300px;
margin-right: auto;
margin-left: auto;
padding-right: 10px;
padding-left: 10px;

@media screen and (max-width: 991px ) {
    padding-right: 30px;
    padding-left: 30px;
}
`;

export const ContainerSm = styled.div`
z-index: 1;
width: 50%;
max-width: 1300px;
padding-bottom: 15px;

@media screen and (max-width: 991px ) {
    padding-right: 30px;
    padding-left: 30px;
}
`;

export const Button = styled.button`
    border-radius: 4px;
    background: ${({primary}) => (primary ? '#e0afa0' : '#f4f3ee')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '12px 64px' : '10px 20px')};
    color: #fff;
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
        background: ${({primary}) => (primary ? '#f4f3ee' : '#e0afa0')};
    }

    @media screen and (max-width: 960px){
        width: 100%;
    }
`;

export const ButtonSm = styled.button`
    border-radius: 4px;
    background: ${({secondary}) => (secondary ? '#95d5b2' : '#f07167')};
    white-space: nowrap;
    padding: ${({small}) => (small ? '10px 16px' : '10px 16px')};
    color: #fff;
    font-size: ${({fontSmall}) => (fontSmall ? '16px' : '12px')};
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
        background: ${({secondary}) => (secondary ? '#d8f3dc' : '#fed9b7')};
    }

    @media screen and (max-width: 960px){
        width: 100%;
    }
`;

export default GlobalStyle