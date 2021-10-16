import fetch from 'node-fetch';

export function fetchAsync(url) {
  return fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
}
