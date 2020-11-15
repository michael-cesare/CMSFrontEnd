import fetch from 'isomorphic-fetch';
import fs from 'fs';

export const readfileFs = async (fetchUrl: string, onSuccess: any, onError: any): Promise<void> => {
  const action = async () => fs.readFile(fetchUrl, (err: any, json: any) => {
    if (err) {
      onError(err);
    }

    const data = JSON.parse(json);
    onSuccess(data);
  });

  return await action();
}

export const readfile = async (fetchUrl: string, onSuccess: any, onError: any): Promise<void> => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const action = async () =>
  fetch(fetchUrl, requestOptions)
  .then(response => response.json())
  .then((config:any) => {
    onSuccess(config);
  })
  .catch((error: any) => {
    onError(error);
  });

  return await action();
}
