

axios.get('https://cors-anywhere.herokuapp.com/http://hqcasanova.com/co2/?callback=process')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
