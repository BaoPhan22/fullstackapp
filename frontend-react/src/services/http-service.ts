import apiClient from "./api-client";

export interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private createHeaders() {
    return localStorage.getItem("access_token")
      ? { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
      : undefined;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
  delete(id: number) {
    const headers = this.createHeaders();
    return apiClient.delete(this.endpoint + "/" + id, { headers });
  }
  update<T extends Entity>(entity: T) {
    const headers = this.createHeaders();
    return apiClient.put(this.endpoint + "/" + entity.id, entity, { headers });
  }
  add<T>(entity: T) {
    const headers = this.createHeaders();
    return apiClient.post(this.endpoint, entity, { headers });
  }
}

const create = (endpoint: string) =>
  new HttpService(endpoint);
export default create;
