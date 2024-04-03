// src/authService.js
import config from 'src/config';

export const registerUser = async ({ email, password, timezone }) => {
  // Call your backend to register the user
  // For example, using the fakeBackend setup
  const response = await fetch(`${config.API_ENDPOINT}/api/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      timezone
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return loginUser({ email, password });
};

export const loginUser = async ({ email, password }) => {
  // Call your backend to authenticate the user
  const response = await fetch(`${config.API_ENDPOINT}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  const body = await response.json();
  // Save the user to local storage
  localStorage.setItem('token', body.token);
  return body.token
};

export const logoutUser = () => {
  // Remove the user from local storage
  localStorage.removeItem('token');
  // Update the auth state with a null value
}

export const getCurrentUser = async () => {
  // Get the user from local storage
  const token = localStorage.getItem('token');
  const response = await fetch(`${config.API_ENDPOINT}/api/current-user`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    logoutUser();
  }
  // Update the auth state with the logged-in user
  const body = await response.json()
  return body.user
}

export const updateCurrentUser = async ({ timezone }) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${config.API_ENDPOINT}/api/update-current-user`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timezone,
    }),
  });
  if (!response.ok) {
    throw new Error('Update failed');
  }
}