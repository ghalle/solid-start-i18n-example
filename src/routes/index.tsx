import { createServerData$, redirect } from "solid-start/server";

export function routeData() {
  return createServerData$((_, { request }) => {
    // TODO parse accept-language header
    throw redirect("/en");
  });
}

export default function Index() {
  return <div>Redirecting...</div>;
}
