import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SCHeader = styled.div`
    background: #ffdd67;
    height: ${props => (props.vh ? `${props.vh}vh` : '50vh')};
`;

const SCText = styled.div`
    font-size: 3rem;
`;

function Header({ vh }) {
    return (
        <SCHeader vh={vh}>
            <SCText>
                <span role="img" aria-label="Looking for your bike">
                    🚲 🚲 🚲
                </span>
            </SCText>
            {/* <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav> */}
        </SCHeader>
    );
}

export default Header;
