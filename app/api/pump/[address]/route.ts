import { getPumpDetail } from "common/api";

export async function GET( _request: Request, { params }: { params: { address: string } }) {
  const data = await getPumpDetail(params.address)
  return Response.json(data)
}
