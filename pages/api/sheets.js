import { google } from "googleapis"

async function handler(req, res) {
	const auth = new google.auth.GoogleAuth({
		keyFile: './credentials.json',
		scopes: 'https://www.googleapis.com/auth/spreadsheets',
	})

	const client = await auth.getClient()

	//Instance de Google Sheets API
	const sheets = google.sheets({ version: 'v4', auth: client })


	const spreadsheetId = '1Raga3yqTS2ozXy2ezzpyRQblnVzK0BIJF_7u4eNPYRA'

	if (req.method === "POST") {

		//Ajouter les données du formulaire sur la feuille
		const { nom, prenom, tel, cp, adresse, ville, numero } = req.body;
		console.log(nom, prenom, tel, cp, adresse, ville, numero);

		const addData = await sheets.spreadsheets.values.append({
			auth,
			spreadsheetId,
			range: 'Sheet1!A2:G',
			valueInputOption: 'USER_ENTERED',
			requestBody: {
				values: [[nom, prenom, tel, cp, adresse, ville, numero]],
			},
		})

		return (
			res.json(addData)
		)

	} else if (req.method === "GET") {

		//Extraire données écrites dans la feuille
		const getRows = await sheets.spreadsheets.values.get({
			auth, spreadsheetId,
			range: "Sheet1!A2:G",
			valueRenderOption: "UNFORMATTED_VALUE"
		})

		return (
			res.json(getRows.data)
		)

	} return res.status(200).json({ message: 'Hey!' })
}

export default handler;