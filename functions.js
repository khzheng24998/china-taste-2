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

const getCookie = function(cname)
{
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++)
  {
    let c = ca[i];
    while (c.charAt(0) == ' ')
      c = c.substring(1);

    if (c.indexOf(name) == 0)
      return c.substring(name.length, c.length);
  }
  return "";
}

export {post, getCookie};
