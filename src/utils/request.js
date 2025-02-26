const API_DOMAIN = "http://localhost:3020/";

export const get = async (path) =>{
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
}

export const post = async (path,option) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(option)
  })
  return await response.json();
}

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  return await response.json();
}

export const patch = async (path,option) => {
  const response = await fetch(API_DOMAIN + path,{
    method:"PATCH",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(option)
  });
  return await response.json();
}