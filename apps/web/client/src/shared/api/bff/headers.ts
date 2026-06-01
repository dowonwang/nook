const UPSTREAM_HEADER_NAMES = ['authorization', 'accept'];
const DOWNSTREAM_HEADER_NAMES = [
  'content-type',
  'set-cookie',
  'cache-control',
  'etag',
  'location',
];

export function pickUpstreamHeaders(headers: Headers): Headers {
  const result = new Headers();

  for (const key of UPSTREAM_HEADER_NAMES) {
    const value = headers.get(key);

    if (value) {
      result.set(key, value);
    }
  }

  return result;
}

export function pickDownstreamHeaders(headers: Headers): Headers {
  const result = new Headers();

  for (const key of DOWNSTREAM_HEADER_NAMES) {
    const value = headers.get(key);

    if (value) {
      result.set(key, value);
    }
  }

  return result;
}
