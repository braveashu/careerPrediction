const axios = require('axios');

const userData = {
  personality: 1,
  work_scenerio: 2,
  field_interest: 0,
  academics: 1,
  analytics: 2,
  general_science: 2
};

axios.post('http://localhost:3000/receive-data', userData)
  .then((response) => {
    console.log(response.data.message);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
