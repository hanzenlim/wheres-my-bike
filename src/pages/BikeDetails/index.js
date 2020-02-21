import React, { useState, useEffect } from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';
import { Card } from 'antd';

import SuperDiv from '../../components/SuperDiv';
import Loading from '../../components/Loading';
import { getBikeWiseBikeDetailUrl } from '../../util/bikewiseApi';

const SCCard = styled(Card)`
    overflow: hidden;
`;

function BikeDetail({ id }) {
    useEffect(() => {
        if (!id) {
            setIsLoading(true);

            return;
        }

        fetch(getBikeWiseBikeDetailUrl(id), {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                setBikeDetailResult(_get(response, 'incident'));
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [id]);

    const [bikeDetailResult, setBikeDetailResult] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const imgSrc = _get(bikeDetailResult, 'media.image_url_thumb');
    const title = _get(bikeDetailResult, 'title');
    const desc = _get(bikeDetailResult, 'description');
    const address = _get(bikeDetailResult, 'address');
    const dateOccurred = _get(bikeDetailResult, 'dateOccurred');
    const location = _get(bikeDetailResult, 'location_description');

    if (isLoading) {
        return <Loading />;
    }
    return (
        <SuperDiv>
            {imgSrc && (
                <SCCard>
                    <img alt="bike" src={imgSrc} />
                </SCCard>
            )}

            <SuperDiv marginTop="10px">
                {title && (
                    <p>
                        <span>
                            <b>Title: </b>
                        </span>
                        <span>{title}</span>
                    </p>
                )}
                {desc && (
                    <p>
                        <span>
                            <b>Desc: </b>
                        </span>
                        <span>{desc}</span>
                    </p>
                )}
                {address && (
                    <p>
                        <span>
                            <b>Address: </b>
                        </span>
                        <span>{address}</span>
                    </p>
                )}
                {dateOccurred && (
                    <p>
                        <span>
                            <b>Date: </b>
                        </span>
                        <span>{dateOccurred}</span>
                    </p>
                )}
                {location && (
                    <p>
                        <span>
                            <b>Location: </b>
                        </span>
                        <span>{location}</span>
                    </p>
                )}
            </SuperDiv>
        </SuperDiv>
    );
}

export default BikeDetail;
