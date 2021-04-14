import http from "../http-common";

class SongsService {
  getAll() {
    return http.get("");
  }

  get(id) {
    return http.get(`${id}`);
  }

  create(data) {
    return http.post("/songs", data);
  }

  update(id, data) {
    return http.put(`/songs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/songs/${id}`);
  }

  deleteAll() {
    return http.delete(`/songs`);
  }

  findByTitle(title) {
    return http.get(`/songs?title=${title}`);
  }
}

export default new SongsService();