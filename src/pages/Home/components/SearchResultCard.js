import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const SCCard = styled(Card)`
    width: 240px;
    height: 360px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const SCDefaultImage = styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    border-bottom: 0.5px solid #dcd6d6;
    margin-top: 20px;
    font-size: 100px;
`;

const SCCardContainer = styled.div``;

function SearchCard({ onClick, imgSrc, title, dateOccured }) {
    let imgComponent;
    if (imgSrc) {
        imgComponent = (
            <img alt="thumbnail" src={imgSrc} width="240" height="220" />
        );
    } else {
        imgComponent = (
            <SCDefaultImage>
                <span role="img" aria-label="bike">
                    🚲
                </span>
            </SCDefaultImage>
        );
    }
    return (
        <SCCard
            onClick={onClick}
            hoverable
            cover={<SCCardContainer>{imgComponent}</SCCardContainer>}
        >
            <b>Date:</b> {dateOccured}
            <p>
                <b>Name: </b>
                {title}
            </p>
            <p></p>
        </SCCard>
    );
}

export default SearchCard;
