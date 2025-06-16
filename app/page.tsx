// app/page.tsx (server component)

import { client } from "../tina/__generated__/client";
import EditablePage from "./EditablePage";

export default async function Page() {
  const { data, query, variables } = await client.queries.user_manual({
    relativePath: "user-manual.json",
  });

  return <EditablePage data={data} query={query} variables={variables} />;
}
