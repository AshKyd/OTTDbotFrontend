import { fetchWithAuth } from "../../utils";
import CompanyColour from "../CompanyColour/CompanyColour";
import words from "./words.json";

export default function Clients({ clients, companies, adminAuthValue }) {
  const hydratedClients = Object.values(clients)
    .filter((data) => data.id > 1)
    .map((client) => {
      const company = companies.find(
        (thisCompany) => thisCompany.id === client.company
      );
      return { ...client, company };
    });

  async function doAction(e) {
    e.preventDefault();
    const { id, action, confirmation, promptText, promptValue } =
      e.target.dataset;

    if (!action) {
      return;
    }

    let promptResponse;
    if (promptText) {
      promptResponse = prompt(promptText, promptValue);
      if (!promptResponse) {
        return;
      }
    }

    if (confirmation && !window.confirm(confirmation)) {
      return;
    }

    const path = `clients/moderation/${action}/${id}`;
    console.log("path", path);
    const res = await fetchWithAuth(path, adminAuthValue);
    console.log("res", res);
  }

  async function doRename(e) {
    const { id, name } = e.target.dataset;
    const defaultNewName = [
      words.honorifics[Math.round(Math.random() * words.honorifics.length - 1)],
      words.surnames[Math.round(Math.random() * words.surnames.length - 1)],
    ].join("");

    const promptResponse = prompt(
      `Enter a new name to rename ${name}:`,
      defaultNewName
    );
    if (!promptResponse) {
      return;
    }
    const path = `clients/moderation/rename/${id}/${promptResponse || ""}`;
    const res = await fetchWithAuth(path, adminAuthValue);
    console.log("res", res);
  }

  async function doMessage(e) {
    const { id, name } = e.target.dataset;

    const message = prompt(`Enter a message for ${name}:`);
    if (!message) {
      return;
    }
    const path = `say/client/${id}?message=${encodeURIComponent(message)}`;
    const res = await fetchWithAuth(path, adminAuthValue);
    console.log("res", res);
  }

  return (
    <fieldset>
      <legend>Clients</legend>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>company</th>
            <th>geo</th>
            <th>ip</th>
            <th>joindate</th>
            <th>lang</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hydratedClients.map(
            ({ company, geo, id, ip, joindate, lang, name }) => (
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <CompanyColour colour={company?.colour}>
                    {company?.name || "no company"}
                  </CompanyColour>
                </td>
                <td>{geo}</td>
                <td>{ip}</td>
                <td>{joindate}</td>
                <td>{lang}</td>
                <td>
                  <ul class="builder__buttons">
                    <li>
                      <button
                        data-id={id}
                        data-action="kick"
                        data-confirmation={`This will kick ${name} from the server. Continue?`}
                        onClick={doAction}
                      >
                        Kick
                      </button>
                    </li>
                    <li>
                      <button
                        data-id={id}
                        data-action="ban"
                        data-confirmation={`This will permanently BAN ${name} from the server. Continue?`}
                        onClick={doAction}
                      >
                        Ban
                      </button>
                    </li>
                    <li>
                      <button data-id={id} data-name={name} onClick={doRename}>
                        Rename
                      </button>
                    </li>
                    <li>
                      <button data-id={id} data-name={name} onClick={doMessage}>
                        DM
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </fieldset>
  );
}
