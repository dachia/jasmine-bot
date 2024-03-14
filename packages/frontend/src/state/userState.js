import { atom } from 'recoil';

const userAtom = atom({
    key: 'user',
    // Get initial state from local storage to enable user to stay logged in
    default: null,
});

export { userAtom };