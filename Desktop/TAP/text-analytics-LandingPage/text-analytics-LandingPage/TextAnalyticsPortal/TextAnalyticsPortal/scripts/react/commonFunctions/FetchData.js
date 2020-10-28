const FetchData = (data, endpoint) => {
      const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(
    endpoint, //pass url as variable
    options
  );
};


export default FetchData;