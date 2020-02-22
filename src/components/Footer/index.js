import React from 'react';
import styled from 'styled-components';

const SCFooter = styled.div`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00e5ff;
    color: white;
    font-size: 18px;
`;

function Footer() {
    return <SCFooter>Made by Hanzen Lim</SCFooter>;
}

export default Footer;
