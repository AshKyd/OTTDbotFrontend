import { useEffect, useState } from "preact/hooks";
import { fetchWithAuth } from "../utils";
import AFK from "./AFK/AFK";
import Companies from "./Companies/Companies";
import Clients from "./Clients/Clients";

async function fetchData({ adminAuthValue }) {
  const [companies, afk, clients] = await Promise.all([
    fetchWithAuth("companies", adminAuthValue).then((res) => res.json()),
    fetchWithAuth("afk", adminAuthValue).then((res) => res.json()),
    fetchWithAuth("clients", adminAuthValue).then((res) => res.json()),
  ]);

  const hydratedAfk = Object.entries(afk)
    .map(([companyId, afkUntil]) => ({
      company: companies.find((company) => company.id === Number(companyId)),
      afkUntil,
    }))
    .filter(({ company }) => company);

  return { companies, afk: hydratedAfk, clients };
}

export default function Dashboard({ adminAuthValue }) {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData({ adminAuthValue }).then(setData);
  }, [adminAuthValue]);

  if (!data) {
    return null;
  }

  return (
    <>
      <AFK data={data.afk} />
      <Companies data={data.companies} />
      <Clients
        clients={data.clients}
        companies={data.companies}
        adminAuthValue={adminAuthValue}
      />
    </>
  );
}
