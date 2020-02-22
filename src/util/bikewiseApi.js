export const getBikeWiseSearchUrl = ({
    location,
    page,
    perPage,
    queryText,
    dateRange,
}) => {
    let url = `https://bikewise.org:443/api/v2/incidents?page=${page}&per_page=${perPage}&proximity=${location}&proximity_square=100&query=${queryText}`;

    if (dateRange[0] && dateRange[1]) {
        url += `&occurred_after=${dateRange[0]}&occurred_before=${dateRange[1]}`;
    }

    return url;
};

export const getBikeWiseBikeDetailUrl = id => {
    return `https://bikewise.org:443/api/v2/incidents/${id}`;
};
