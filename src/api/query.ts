import ky from "ky";

const query = ky.create({
  prefixUrl: "http://localhost:8090/",
  credentials: "include",
});

export default query;
