//Return value: A Promise which resolves to a JSON object
const post = function(url, data)
{
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}

export {post};
