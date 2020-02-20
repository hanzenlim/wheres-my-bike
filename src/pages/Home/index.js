import React, { useEffect, useState } from 'react';
import { Icon } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import _get from 'lodash/get';
import styled from 'styled-components';
import { Input } from 'antd';

import SearchCard from './components/SearchCard';
import SuperDiv from '../../components/SuperDiv';
import { getBikeWiseSearchUrl } from '../../util/bikewiseApi';

const { Search } = Input;
const { RangePicker } = DatePicker;

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
const defaultLocation = 'berlin';

function generateSearchCard(results) {
    if (results.length === 0) {
        return (
            <SuperDiv height="100vh" margin="20px auto">
                <SuperDiv fontSize="50px">
                    <Icon type="frown" />
                </SuperDiv>
                <SuperDiv fontSize="20px">Sorry no results!</SuperDiv>
            </SuperDiv>
        );
    }

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

function renderLoadingComponent() {
    return (
        <SuperDiv margin="30px auto" height="100vh" fontSize="60px">
            <Icon type="loading" />
        </SuperDiv>
    );
}

function Home() {
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const [queryText, setQueryText] = useState('');
    const [dateRange, setDateRange] = useState(['', '']);

    useEffect(() => {
        fetch(
            getBikeWiseSearchUrl({
                location: defaultLocation,
                page: 1,
                perPage,
                queryText,
                dateRange,
            }),
            {
                method: 'GET',
            }
        )
            .then(res => res.json())
            .then(response => {
                console.log(response);
                setSearchResult(_get(response, 'incidents'));
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [queryText, dateRange]);

    return (
        <div>
            <SuperDiv marginTop="20px" margin="0 auto" fontSize="30px">
                <SuperDiv
                    paddingTop="20px"
                    width={['300px', '500px', '500px']}
                    margin="0 auto"
                >
                    <Search
                        size="large"
                        placeholder="search for your bike"
                        onSearch={value => {
                            setQueryText(value);
                            setIsLoading(true);
                        }}
                    />
                    <SuperDiv marginTop="5px">
                        <RangePicker
                            style={{ width: '100%' }}
                            size="large"
                            onChange={(a, b) => {
                                const [startDate, endDate] = b;
                                setIsLoading(true);
                                setDateRange([
                                    moment(startDate).unix(),
                                    moment(endDate).unix(),
                                ]);
                            }}
                        />
                    </SuperDiv>
                </SuperDiv>
            </SuperDiv>
            <SCContainer>
                {isLoading
                    ? renderLoadingComponent()
                    : generateSearchCard(searchResult)}
            </SCContainer>
        </div>
    );
}

export default Home;
