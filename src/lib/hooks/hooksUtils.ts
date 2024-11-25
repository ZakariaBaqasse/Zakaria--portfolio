export type APIError = Pick<Response, "status" | "statusText"> & {
  data: { success?: boolean; message?: string };
};

export const getData = <Result>(url: string) =>
  fetch(url, {
    method: "GET",
  }).then(async (response) => {
    if (!response.ok) {
      let data = {};
      if (response.headers.get("Content-Type") === "application/json") {
        data = await response.json();
      } else {
        data = await response.text();
      }
      const error: APIError = {
        data,
        status: response.status,
        statusText: response.statusText,
      };
      throw error;
    }
    return response.json() as Promise<Result>;
  });
