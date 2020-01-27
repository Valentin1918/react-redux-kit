import { reqParams, cacheName } from '../constants/system';

export const isFunc = cb => typeof cb === 'function';

export const call = (cb, ...args) => { if (isFunc(cb)) cb(...args); };

export const goTo = url => { global.location = url };

export const getQueryParams = () => {
  const params = {};
  const query = global.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (typeof params[pair[0]] === 'undefined') {
      params[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof params[pair[0]] === 'string') {
      params[pair[0]] = [params[pair[0]], decodeURIComponent(pair[1])];
    } else {
      params[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return params;
};

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const cacheImages = items => {
  if (!Array.isArray(items) || !items.length || !window.caches) return;
  const urlSet = items.reduce((acc, { imageLink }) => {
    if (imageLink) acc.add(imageLink);
    return acc;
  }, new Set([]));
  const urlArr = [...urlSet];
  const fetches = urlArr.map(url => fetch(new Request(url, reqParams)));

  caches.open(cacheName).then(cache => {
    Promise.all(fetches).then(arr => {
      arr.forEach((res, i) => cache.put(urlArr[i], res));
    });
  });
};
