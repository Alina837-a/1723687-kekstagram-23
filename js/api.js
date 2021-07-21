const fetchData = (url, method, onSuccess, onFail, body) => {
  fetch(url, {method, body})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .then((result) => {
      onSuccess(result);
    })
    .catch((error) => {
      onFail(error);
    });
};

export {fetchData};
