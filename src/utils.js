export function fetchWithAuth(pathname, { baseUrl, username, password }) {
  const url = `${baseUrl}${pathname}`;
  const headers = new Headers();
  const auth = "Basic " + btoa(username + ":" + password);
  console.log("fetching", { url, pathname, baseUrl, username, password, auth });
  headers.set("Authorization", auth);
  return fetch(url, { headers });
}
