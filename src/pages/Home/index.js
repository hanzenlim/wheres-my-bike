import React, { useEffect, useState } from 'react';
import { Pagination, Modal } from 'antd';
import { Icon } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import _get from 'lodash/get';
import styled from 'styled-components';
import { Input } from 'antd';

import Loading from '../../components/Loading';
import SearchCard from './components/SearchResultCard';
import BikeDetails from '../BikeDetails';
import SuperDiv from '../../components/SuperDiv';
import { getBikeWiseSearchUrl } from '../../util/bikewiseApi';

const { Search } = Input;
const { RangePicker } = DatePicker;

const SCFlexContainer = styled.div`
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

function generateSearchCard(results, onSearchCardClick) {
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
                    onClick={() => onSearchCardClick(_get(e, 'id'))}
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
    const [isLoading, setIsLoading] = useState([true]);
    const [queryText, setQueryText] = useState('');
    const [dateRange, setDateRange] = useState(['', '']);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bikeDetailId, setBikeDetailId] = useState();

    useEffect(() => {
        fetch(
            getBikeWiseSearchUrl({
                location: defaultLocation,
                page,
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
    }, [queryText, dateRange, page]);

    function onSearchCardClick(id) {
        setBikeDetailId(id);
        setIsModalOpen(true);
    }

    return (
        <div>
            <SuperDiv marginTop="20px" margin="0 auto" fontSize="30px">
                <Modal
                    footer={null}
                    title="Bike Detail"
                    visible={isModalOpen}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setBikeDetailId(undefined);
                    }}
                >
                    <BikeDetails id={bikeDetailId} />
                </Modal>
                <SuperDiv
                    paddingTop="20px"
                    width={['300px', '500px', '500px']}
                    margin="0 auto"
                >
                    <Search
                        width="100%"
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
                                debugger;
                                const [startDate, endDate] = b;
                                setIsLoading(true);
                                setDateRange([
                                    startDate
                                        ? moment(startDate).unix()
                                        : undefined,
                                    endDate
                                        ? moment(endDate).unix()
                                        : undefined,
                                ]);
                            }}
                        />
                    </SuperDiv>
                </SuperDiv>
            </SuperDiv>
            <SuperDiv>
                {isLoading ? (
                    <Loading />
                ) : (
                    <SCFlexContainer>
                        {generateSearchCard(searchResult, onSearchCardClick)}
                    </SCFlexContainer>
                )}
                <SuperDiv margin="0 auto">
                    <Pagination
                        defaultCurrent={1}
                        total={50}
                        onChange={page => {
                            setPage(page);
                            setIsLoading(true);
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                            });
                        }}
                    />
                </SuperDiv>
            </SuperDiv>
        </div>
    );
}

export default Home;
