import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _get from 'lodash/get';
import styled from 'styled-components';
import { Input } from 'antd';

import SearchCard from './components/SearchCard';
import SuperDiv from '../../components/SuperDiv';
import { getBikeWiseSearchUrl } from '../../util/bikewiseApi';

const { Search } = Input;

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

const perPage = 10;
const location = 'berlin';

function generateSearchCard(results) {
    return results.map(e => {
        return (
            <SCFlexCard>
                <SearchCard
                    title={_get(e, 'title')}
                    imgSrc={_get(e, 'media.image_url_thumb')}
                    dateOccured={moment(_get(e, 'occurred_at')).format(
                        'MM/DD/YYYY'
                    )}
                />
            </SCFlexCard>
        );
    });
}

function Home() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetch(getBikeWiseSearchUrl({ location, page: 1, perPage }), {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                setSearchResult(_get(response, 'incidents'));
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <SuperDiv marginTop="20px" margin="0 auto" fontSize="30px">
                <SuperDiv
                    paddingTop="20px"
                    width={['300px', '300px', '300px']}
                    margin="0 auto"
                >
                    {/* <SuperDiv width="200px" margin="0 auto"> */}
                    <Search
                        size="large"
                        placeholder="input search text"
                        onSearch={value => alert(value)}
                    />
                </SuperDiv>
            </SuperDiv>
            <SCContainer>{generateSearchCard(searchResult)}</SCContainer>
        </div>
    );
}

export default Home;
