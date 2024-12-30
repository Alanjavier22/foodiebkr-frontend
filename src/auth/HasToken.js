import jwt_decode from "jwt-decode";

const HasToken = () => {
  const token = localStorage.getItem("token");
  const _user = token ? jwt_decode(token) : null;

  if (_user) return { ..._user, login: true };

  return { login: false, rol: "cliente", nombre: "", id_rol: 4 };
};

export default HasToken;
