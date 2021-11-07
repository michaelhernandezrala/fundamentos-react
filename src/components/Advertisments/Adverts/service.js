import client from "../../../api/Client";

export const getAdverts = () => {
    const url = '/api/v1/adverts'
    return client.get(url);
}

export const deleteAdvert = (id) => {
    const url = `/api/v1/adverts/${id}`
    return client.delete(url);
}