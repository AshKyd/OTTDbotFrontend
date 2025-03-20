import CompanyColour from "../CompanyColour/CompanyColour";
import Money from "../Money/Money";

export default function Companies({ data }) {
  return (
    <fieldset>
      <legend>Companies</legend>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Loan</th>
            <th>Money</th>
            <th>Value</th>
            <th>Year founded</th>
            <th>Train count</th>
            <th>Road vehicle count</th>
            <th>Plane count</th>
            <th>Ship count</th>
            <th>Is protected</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              colour,
              id,
              isProtected,
              loan,
              money,
              name,
              planeCount,
              roadVehicleCount,
              shipCount,
              trainCount,
              value,
              yearFounded,
            }) => (
              <tr>
                <td>{id}</td>
                <td>
                  <CompanyColour colour={colour}>{name}</CompanyColour>
                </td>
                <td>
                  <Money money={loan} />
                </td>
                <td>
                  <Money money={money} />
                </td>
                <td>
                  <Money money={value} />
                </td>
                <td>{yearFounded}</td>
                <td>{trainCount}</td>
                <td>{roadVehicleCount}</td>
                <td>{planeCount}</td>
                <td>{shipCount}</td>
                <td>{String(isProtected)}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </fieldset>
  );
}
