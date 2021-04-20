import axios from "axios";
import authHeader from "../utils/Utils";

function baseHttp() {
  return axios.create({
    baseURL: "http://127.0.0.1:8000/musey/api",
    headers:
      authHeader(),
  })
}

class SongsService {
  getAll() {
    return baseHttp().get("");
  }

  get(song_title) {
    return baseHttp().get(`/songs/${song_title}`);
  }

  create(data) {
    return baseHttp().post("/songs", data);
  }

  update(song_title, data) {
    return baseHttp().put(`/songs/${song_title}`, data);
  }

  delete(id) {
    return baseHttp().delete(`/songs/${id}`);
  }

  deleteAll() {
    return baseHttp().delete(`/songs`);
  }
}

export default new SongsService();