const APIURL = 'http://localhost:3001'

/* LOADING DATA FROM SERVER */
async function getServicesPerOfficer() {
  const response = await fetch(APIURL+'/getServicesPerOfficer');
  const servicesPerOfficer = await response.json();
  if (response.ok) {
    return servicesPerOfficer.map((l) => ({id: l.id, idService: l.idService, idOfficer: l.idOfficer}) )
  } else {
    throw servicesPerOfficer; //which will contain an error if it is the case
  }
}

async function getServices() {
  const response = await fetch(APIURL+'/getServices');
  const services = await response.json();
  if (response.ok) {
    return services.map((l) => ({id: l.id, name: l.name, tr: l.tr}) )
  } else {
    throw services; //which will contain an error if it is the case
  }
}

async function getQueues() {
  const response = await fetch(APIURL+'/getQueues');
  const queues = await response.json();
  if (response.ok) {
    return queues.map((l) => ({userId: l.userId, idService: l.idService, ticketTime: l.ticketTime, turnTime: l.turnTime}) )
  } else {
    throw queues; //which will contain an error if it is the case
  }
}

/* ENQUEUE, not working (Error 503 returned by the operation in the DB) */

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


/* LOGIN FUNCTIONS, not linked to any endpoint on server yet */
async function logIn(credentials) {
    let response = await fetch((APIURL+'/sessions'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetail = await response.json();
      throw errDetail.message;
    }
  }
  
  async function logOut() {
    await fetch((APIURL+'/sessions/current'), { method: 'DELETE', credentials: 'include' });
  }
  
  async function getUserInfo() {
    const response = await fetch((APIURL+'/sessions/current'), {credentials: 'include'});
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo; 
    }
  }

const API = {logIn, logOut, getUserInfo, getServices, getServicesPerOfficer, addElementInQueue};
export default API;
