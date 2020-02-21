export const getBikeWiseSearchUrl = ({
    location,
    page,
    perPage,
    queryText,
    dateRange,
}) => {
    return `https://bikewise.org:443/api/v2/incidents?page=${page}&per_page=${perPage}&proximity=${location}&proximity_square=100&query=${queryText}&occurred_after=${dateRange[0]}&occurred_before=${dateRange[1]}`;
};

export const getBikeWiseBikeDetailUrl = id => {
    return `https://bikewise.org:443/api/v2/incidents/${id}`;
};
