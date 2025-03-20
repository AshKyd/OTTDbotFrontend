import { useEffect, useState } from "preact/hooks";
import { adminAuth } from "../Login/store";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";

export function App() {
  if (!adminAuth.value) {
    return <Login />;
  }
  return <Dashboard adminAuthValue={adminAuth.value} />;
}
