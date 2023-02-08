// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';

//set bodyparser
export const config = {
  api: {
    bodyParser: false
  }
}

type ResponseData = {
  isValid: boolean
}

const readPurchaseOrderDetails = (path: string): Promise<any[]> =>
  new Promise((resolve, reject) => {
    const data: any[] = [];
    fs.createReadStream(path)
      .pipe(
        parse({
          delimiter: "|",
          columns: true,
          ltrim: true,
        })
      )
      .on("data", function (row: any) {
        data.push(row);
      })
      .on("error", function (error: Error) {
        console.log(error.message);
        reject(error);
      })
      .on("end", function () {
        resolve(data);
      });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data: { fields: { date: string, vendorName: string }; files: any } = await new Promise(
    (resolve, reject) => {
      const form = new formidable.IncomingForm();

      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    }
  );

  // console.log(data.fields.date);
  // console.log(data.fields.vendorName);

  const parsedData: any[] = await readPurchaseOrderDetails(data.files.file.filepath);

  const regExp = [/\w+/, /[-+]?[0-9]*\.[0-9]+/, /[-+]?[0-9]+/];
  const isValid = parsedData.every((data) => {
    return regExp[0].test(data['Model Number']) && regExp[1].test(data['Unit Price']) && regExp[2].test(data['Quantity'])
  });

  res.status(200).json({ isValid })
}
