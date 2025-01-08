//TODO: crypt values
const cryptValues = {
  jwt: {
    header: 'i08',
    payload: 'i09',
    signature: 'i10',
  }
}

export const getJWT = () => {
  const header = localStorage.getItem(cryptValues.jwt.header);
  const payload = localStorage.getItem(cryptValues.jwt.payload);
  const signature = localStorage.getItem(cryptValues.jwt.signature);
  const token = [header, payload, signature].join('.')
  return token ?? 'no-token-found';
}

export const saveJWT = (token: string) => {
  const splitToken = token.split('.');
  if (splitToken.length !== 3) return false;
  const [ header, payload, signature ] = splitToken;
  localStorage.setItem(cryptValues.jwt.header, header);
  localStorage.setItem(cryptValues.jwt.payload, payload);
  localStorage.setItem(cryptValues.jwt.signature, signature);
  return true;
}

export const removeJWT = () => {
  localStorage.removeItem(cryptValues.jwt.header);
  localStorage.removeItem(cryptValues.jwt.payload);
  localStorage.removeItem(cryptValues.jwt.signature);
}

export  const getXTimeUser = () => {
  return new Date().getTime();
}
