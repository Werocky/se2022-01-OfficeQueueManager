
const APIURL = 'http://localhost:3001/api/v1'

async function addElementInQueue(service, ticketTime) {
  const url = APIURL + `/ticket/${service}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "ticketTime": ticketTime, 
      }),
      headers: {
        'Content-Type': 'application/json',
     },
    });
    if (response.ok) {
      return true
  } else {
      const text = await response.text()
      throw new TypeError(text)
  }
  } catch (ex) {
    throw ex;
  }
}

const API = {
  addElementInQueue,
}

export default API;