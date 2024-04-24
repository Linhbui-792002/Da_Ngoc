import { getRecord } from "@src/common/lib/mongo/sct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const { plans, error } = await getRecord(id ? String(id) : undefined);
            if (error) throw Error(error);
            return res.status(200).json(plans);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    res.setHeader('Allow', ['GET']);
    res.status(425).end(`Method ${req.method} is not allowed`);
}