import fetch from 'node-fetch';

export const fetchAsync = (url) => {
  return fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
};
