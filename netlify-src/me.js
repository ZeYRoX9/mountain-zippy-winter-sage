import { json, readToken } from "./lib.mjs";

export async function handler(event) {
  const session = readToken(event);
  if (!session) return json(200, { user: null });
  return json(200, { user: { id: session.uid, email: session.email, role: session.role } });
}
