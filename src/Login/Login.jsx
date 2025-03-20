import { useState } from "preact/hooks";
import { adminAuth } from "./store";

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

    const res = await fetch(url).catch((e) => {
      setError(e.message);
    });
    if (!res) {
      return;
    }
    if (res.status !== 200) {
      setError("Invalid status code connecting to server: " + res.status);
    }

    adminAuth.value = {
      baseUrl: String(url),
      username,
      password,
    };
  }
  return (
    <form className="login">
      <fieldset class="builder__spacious">
        <legend>OTTDBot Login</legend>
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
