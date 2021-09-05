const apiKey = process.env.REACT_APP_API_KEY;

export default function makeRequest({
  url = "/",
  method = "GET",
  headers = {},
  data = {},
  mode = "cors",
}) {
  const controller = new AbortController();

  const requestData = { method, headers, mode };

  headers["X-Auth-Token"] = apiKey;

  if (requestData.method.toLowerCase() !== "get") {
    requestData.body = JSON.stringify(data);
  }

  return fetch(url, requestData, { signal: controller.signal });
}
