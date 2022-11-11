import ky from "ky";

const api = ky.extend({ prefixUrl: "/api/" });

export default api;
