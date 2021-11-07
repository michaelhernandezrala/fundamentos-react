import client from "../../../api/Client";
export const createAdvert = (data) => {
  console.log(data);
  let formData = new FormData(); //formdata object

  formData.append("name", data.name); //append the values with key, value pair
  formData.append("sale", data.sale);
  formData.append("price", data.price); //append the values with key, value pair
  formData.append("tags", data.tags);

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  console.log(formData)
  const url = "/api/v1/adverts";
  return client.post(url, formData);
};

export const getAdvert = (id) => {
  const url = `/api/v1/adverts/${id}`;
  return client.get(url);
};
