import { useState } from "preact/hooks";
import { adminAuth } from "./store";
import { fetchWithAuth } from "../utils";

export default function Login() {
  const [status, setStatus] = useState("ready");
  const [error, setError] = useState(null);
  const [server, setServer] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  async function onClick(e) {
    e.preventDefault();
    let url;
    try {
      url = new URL(server);
      url.pathname = "/";
      url.hash = "";
      url.search = "";
    } catch (e) {
      return setError(e.message);
    }
    if (!url) {
      return setError("Invalid server");
    }
    const newAdminAuth = {
      baseUrl: String(url),
      username,
      password,
    };

    const res = await fetchWithAuth("companies", newAdminAuth).catch((e) => {
      setError(e.message);
    });
    if (!res) {
      return;
    }
    if (res.status !== 200) {
      setError("Invalid status code connecting to server: " + res.status);
      return;
    }

    adminAuth.value = newAdminAuth;
  }
  return (
    <form className="login builder__centre-modal">
      <fieldset class="builder__spacious">
        <legend>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-bus-front-fill"
            viewBox="0 0 16 16"
            style={{ marginBottom: -5 }}
          >
            <path d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.5 2.5 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A44 44 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1zM3.552 3.22A43 43 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44 44 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994M8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1" />
          </svg>{" "}
          OTTDBot Login
        </legend>
        <p>Enter your server url and password to log in</p>
        {error && <p class="error">Error: {error}</p>}
        <label>
          Server
          <input
            name="server"
            type="text"
            value={server}
            onChange={(e) => setServer(e.target.value)}
          />
        </label>
        <label>
          Username
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div class="builder__submit-row">
          <button
            disabled={!server || !username || !password || status !== "ready"}
            onClick={onClick}
          >
            Log in
          </button>
        </div>
      </fieldset>
    </form>
  );
}
