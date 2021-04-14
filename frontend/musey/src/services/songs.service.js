import http from "../http-common";

class SongsService {
  getAll() {
    return http.get("");
  }

  get(song_title) {
    return http.get(`/songs/${song_title}`);
  }

  create(data) {
    return http.post("/songs", data);
  }

  update(song_title, data) {
    return http.put(`/songs/${song_title}`, data);
  }

  delete(id) {
    return http.delete(`/songs/${id}`);
  }

  deleteAll() {
    return http.delete(`/songs`);
  }

  //findByTitle(title) {
  //  return http.get(`/songs/${title}`);
  //}
}

export default new SongsService();