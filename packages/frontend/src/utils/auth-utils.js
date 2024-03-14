// src/utils/authUtils.js
import { useRecoilCallback } from 'recoil';

import { authAtom } from 'src/state/authState';

export const _useSetAuth = () => useRecoilCallback(({ set }) => (user) => {
  set(authAtom, user);
});

export const _useGetAuth = () => useRecoilCallback(({ snapshot }) => async () => {
  const loadable = snapshot.getLoadable(authAtom);
  if (loadable.state === 'hasValue') {
    return loadable.contents;
  }
  throw new Error('Auth state not available');
});