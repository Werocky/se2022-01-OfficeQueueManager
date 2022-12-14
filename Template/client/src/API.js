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
    return services.map((l) => ({id: l.Id, name: l.name, tr: l.tr}) )
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

/* ENQUEUE */
async function addElementInQueue(service, ticketTime/*, clientWaitNumber*/) {
  const url = APIURL + '/addToQueue';
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "ticketTime": ticketTime, 
        "idService": service
        //"clientWaitNumber": clientWaitNumber,
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

async function getUserForService(service) {
  const response = await fetch(APIURL+`/queue/${service}`);
  const max_user = await response.json(); // number of client waiting for a specific service
  if (response.ok) {
    return max_user; // it needs to be formatted
  } else {
    throw max_user;
  }
}

async function getNextClient()
{
  const response = await fetch(APIURL+`/getNextClient`,{credentials:'include'});
  const id= await response.json();
  if(response.ok)
    return id;
  else
    throw id;
 
}

async function getCurrentUser(serviceId) {
  const response = await fetch(APIURL+`/getCurrentUser/${serviceId}`);
  const id= await response.json();
  if(response.ok)
    return id;
  else
    throw id;
}

/* LOGIN FUNCTIONS */
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

const API = {logIn, logOut, getUserInfo, getServices, getServicesPerOfficer, addElementInQueue, getUserForService, getQueues,getNextClient, getCurrentUser};
export default API;
