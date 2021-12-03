import {google} from "googleapis"

async function handler (req, res) {
    if (req.method === "GET"){
    		const {nom, prenom, tel, cp, adresse, ville, numero} = req.body;
			console.log(nom, prenom, tel, cp, adresse, ville, numero);

			const auth = new google.auth.GoogleAuth({
				credentials: {
				  client_email: process.env.CLIENT_EMAIL,
				  client_id: process.env.CLIENT_ID,
				  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
				},
				scopes: [
				  'https://www.googleapis.com/auth/drive',
				  'https://www.googleapis.com/auth/drive.file',
				  'https://www.googleapis.com/auth/spreadsheets',
				],
			  });

			  const sheets = google.sheets({
				auth,
				version: 'v4',
			  });

			  const response = await sheets.spreadsheets.values.batchGet({
				spreadsheetId: process.env.SPREADSHEET_ID,
				range: 'Sheet1!A2:G',
				valueRenderOption: 'FORMATTED_VALUE',
				requestBody: {
				},
				
			  });
		  

		res.json({message: "It works!"});
    }
	res.status(200).json({ message: 'Hey!' });
}

export default handler;