export const getBikeWiseSearchUrl = ({
    location,
    page,
    perPage,
    queryText,
}) => {
    return `https://bikewise.org:443/api/v2/incidents?page=${page}&per_page=${perPage}&proximity=${location}&proximity_square=100&query=${queryText}`;
};
