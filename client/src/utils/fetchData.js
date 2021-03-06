import axios from "axios";
export const URL = `https://api.fostech.vn`;
// export const ARL = `https://mentorzoom.herokuapp.com`;
export const ARL = `http://localhost:5000`;

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${ARL}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const getData = async () => {
  const res = await axios.get(
    `https://api.fostech.vn/api/60939744ac969b4078488026/blog?access_token=e8ba858476afc6a0f6c1d3d686e275a8`
  );
  return res;
};

export const postDataAPI = (url, post, token) => {
  return axios.post(`${ARL}/api/${url}`, post, {
    headers: { Authorization: token },
    withCredentials: true,
  });
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${ARL}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${ARL}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${ARL}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const getDataFostech = async (url, token) => {
  const res = await axios.get(
    `${URL}/api/60939744ac969b4078488026/${url}?access_token=${token}`
  );
  return res;
};

export const postDataFostech = async (url, token, post) => {
  const res = await axios.post(
    `${URL}/api/60939744ac969b4078488026/${url}?access_token=1bd820d564d9dd24883e9be35f8f0888`,
    post
  );
  return res;
};

export const editDataFostech = async (url, id, post) => {
  const res = await axios.put(
    `${URL}/api/60939744ac969b4078488026/${url}/${id}?access_token=1bd820d564d9dd24883e9be35f8f0888`,
    post
  );
  return res;
};

export const deleteDataFostech = async (url, id) => {
  const res = await axios.delete(
    `${URL}/api/60939744ac969b4078488026/${url}/${id}?access_token=1bd820d564d9dd24883e9be35f8f0888`
  );
  return res;
};

export const getInfo = async (url, token) => {
  const res = await axios.get(`${URL}/api/${url}?access_token=${token}`);
  return res;
};
