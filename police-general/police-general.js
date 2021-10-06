const fetch = require('node-fetch')

const handler = async function () {
  try {
    const response = await fetch('https://api.politie.nl/v4/gezocht?language=nl&lat=53.1511173&lon=6.756634599999984&radius=5.0&maxnumberofitems=10&offset=0',
    { method:'GET',
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
