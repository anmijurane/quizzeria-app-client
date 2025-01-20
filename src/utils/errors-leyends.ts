interface LabelStructure {
  BANNER_TITLE: string;
  BANNER_DESC: string;
  EMAIL: string;
  PASSWORD: string;
}

interface ErrorsLeyends {
  [k: string]: LabelStructure
}


export const getErrorFromCatalog = (code: string): LabelStructure => {
  const isValidCode = Object.keys(LOGIN_ERRORS_LABELS).includes(code)
  if (isValidCode) {
    return LOGIN_ERRORS_LABELS[code];
  }
  console.error(`<<${code}>> NOT FOUND IN CATALOG`);
  return LOGIN_ERRORS_LABELS['GENERIC_ERROR'];
}

export const LOGIN_ERRORS_LABELS: ErrorsLeyends = {
  GENERIC_ERROR: {
    BANNER_TITLE: 'error login process',
    BANNER_DESC: 'error unprocessable request',
    EMAIL: '',
    PASSWORD: '',
  },
  AUTH_4619: { // USER_NOT_FOUND
    BANNER_TITLE: 'error login process',
    BANNER_DESC: 'error user not found',
    EMAIL: '',
    PASSWORD: '',
  },
  AUTH_9309: { // USER_NOT_ACTIVE
    BANNER_TITLE: 'error login process',
    BANNER_DESC: 'error user not active',
    EMAIL: '',
    PASSWORD: '',
  },
  AUTH_7707: { // RESOURCE_UNAUTHORIZED
    BANNER_TITLE: 'error login process',
    BANNER_DESC: 'error unprocessable request',
    EMAIL: '',
    PASSWORD: '',
  },
  AUTH_4435: { // BAD_CREDENTIALS
    BANNER_TITLE: 'error login process',
    BANNER_DESC: 'verify the information',
    EMAIL: '',
    PASSWORD: '',
  },
  AUTH_6547: { // ERROR_CREATE_USER
    BANNER_TITLE: 'error login process',
    BANNER_DESC: 'error to create login process',
    EMAIL: '',
    PASSWORD: '',
  },
};

