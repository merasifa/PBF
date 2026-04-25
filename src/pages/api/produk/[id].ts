// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retreiveDataByID as retrieveDataByID } from "../../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  const productId = Array.isArray(id) ? id[0] : id;

  const data = productId
    ? await retrieveDataByID("products", productId)
    : null;

  res.status(200).json({ status: true, status_code: 200, data });
}
