const BASE_URL = "https://test-junior-matheus-lousada.up.railway.app";

export async function login() {
  const url = `${BASE_URL}/login`;
  const email = 'testScandiweb@teste.com';
  const password = '8SR{F9FQhATu';
  const body = {
    email: email,
    password: password
  };

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };

  await fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => localStorage.setItem('token', data.token) )
  .catch(error => console.error(error))
}

export const addProduct = async (product) => {
  const url = `${BASE_URL}/products`;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(product),
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.response);
  }
  return data;
};

export const getProducts = async () => {
  const url = `${BASE_URL}/products`;
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

export const deleteProducts = async (skusToDelete) => {
  const url = `${BASE_URL}/products`;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const requestOptions = {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(skusToDelete),
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message);
};

export const getAttributes = async () => {
  const url = `${BASE_URL}/attributes`;
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

export const getTypes = async () => {
  const url = `${BASE_URL}/types`;
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};
