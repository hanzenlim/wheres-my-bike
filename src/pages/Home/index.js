import React, { useEffect, useState } from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import SearchCard from './components/SearchCard';
import { getBikeWiseSearchUrl } from '../../util/bikewiseApi';

const SCContainer = styled.div`
    padding: 20px 50px;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    margin: 0 auto;
`;

const SCFlexCard = styled.div`
    padding: 20px 25px;
    margin: 0 auto;
`;

function generateSearchCard(results) {
    debugger;
    return results.map(e => {
        return (
            <SCFlexCard>
                <SearchCard
                    title={_get(e, 'title')}
                    imgSrc={_get(e, 'media.image_url_thumb')}
                />
            </SCFlexCard>
        );
    });
}

function Home() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetch(
            getBikeWiseSearchUrl({ location: 'berlin', page: 1, perPage: 20 }),
            {
                method: 'GET',
            }
        )
            .then(res => res.json())
            .then(response => {
                console.log(response);
                debugger;
                setSearchResult(_get(response, 'incidents'));
            })
            .catch(error => console.log(error));
    }, []);

    return <SCContainer>{generateSearchCard(searchResult)}</SCContainer>;
}

export default Home;
