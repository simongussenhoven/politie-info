const fetch = require('node-fetch')

const handler = async function (event) {

  const params = event.queryStringParameters
  const query = params.query;
  const fromdate = params.fromdate;
  const todate = params.todate;
  const maxnumberofitems = params.maxnumberofitems;
  const offset = params.offset
  console.log(maxnumberofitems)
  console.log(offset)

  try {
  const response = await fetch(`https://api.politie.nl/v4/nieuws?language=nl&query=${query}&radius=5.0&maxnumberofitems=${maxnumberofitems}&fromdate=${fromdate}&todate=${todate}&offset=${offset}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message })
    }
  }
}

module.exports = { handler }
