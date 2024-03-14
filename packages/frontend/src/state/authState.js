// src/_state/auth.js
import { atom } from 'recoil';

const authAtom = atom({
    key: 'auth',
    // Get initial state from local storage to enable user to stay logged in
    default: localStorage.getItem('token') || null,
});

export { authAtom };