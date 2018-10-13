

function postData(url = ``, data = {}) {
  // Default options are marked with *
  return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then(response => response.json()); // parses response to JSON
}
const persons = [
  {
    id: 1,
    name: 'Bla blabla',
    location: {
      lat: 200,
      lng: 200
    },
    direction: 165
  },
  {
    id: 4,
    name: 'Zyg zygzyg',
    location: {
        lat: 200,
        lng: 200
    },
    direction: 165
  },
]

const person = {
    id: 1,
    name: 'Dziki dzik',
    location: {
      lat: 200,
      lng: 200
    },
    direction: 165
  };

postData(`http://localhost:3000/api/person/add`, person)
  .then((data) => console.log(data))


// fetch('http://localhost:3000/api/person/list')
//   .then((response) => response.json())
//   .then((responseJSON) => {
//     // do stuff with responseJSON here...
//     console.log(responseJSON);
//   });


      