import { signal, effect } from "@preact/signals";
const KEY = "OTTDBOT_AUTH";

export const adminAuth = signal(
  (() => {
    try {
      return JSON.parse(localStorage[KEY]);
    } catch (e) {}
    return null;
  })()
);

effect(() => {
  if (!adminAuth.value) {
    return;
  }
  console.log("setting to localstosots");
  try {
    localStorage[KEY] = JSON.stringify(adminAuth.value);
  } catch (e) {
    console.error("localStorage not accessible", adminAuth.value);
  }
});
