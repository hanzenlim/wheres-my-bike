export const getBikeWiseSearchUrl = ({ location, page, perPage }) => {
    return `https://bikewise.org:443/api/v2/incidents?page=${page}&per_page=${perPage}&proximity=Berlin&proximity_square=100`;
};
