import client, { removeAuthorizationHeader } from "../../../api/Client";
import { setAuthorizationHeader } from "../../../api/Client";
import storage from "../../../utils/storage";

export const login = (data) => {
  const url = "/api/auth/login";
  const credentials = {
    email: data.email,
    password: data.password
  };

  return client.post(url, credentials).then((response) => {
    if (data.checkbox === true) {
      setAuthorizationHeader(response.data.accessToken);
      storage.set("token", response.data.accessToken);
    } else {
      setAuthorizationHeader(response.data.accessToken);
      storage.setSessionStorage("token", response.data.accessToken);
    }
    
  });
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("token");
  });
