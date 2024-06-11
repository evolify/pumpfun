import { getPumpList } from "common/api";

export async function GET( _request: Request) {
  const data = await getPumpList()
  return Response.json(data)
}