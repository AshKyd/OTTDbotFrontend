import RelativeTime from "../RelativeTime/RelativeTime";

export default function AFK({ data }) {
  console.log({ data });
  return (
    <fieldset>
      <legend>AFK companies</legend>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>AFK time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ company, afkUntil }) => (
            <tr>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>
                <RelativeTime date={new Date(afkUntil)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </fieldset>
  );
}
