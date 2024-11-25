import axios, {AxiosHeaders, AxiosHeaderValue, AxiosResponse, RawAxiosRequestHeaders} from "axios";
import {BFF_URL_BASE} from "../utils/constans.ts";
import {getJWT, getXTimeUser} from "../utils/dataInfra.ts";

type headerDef = AxiosHeaders | Partial<RawAxiosRequestHeaders & {
  Accept: AxiosHeaderValue
  "Content-Length": AxiosHeaderValue
  "User-Agent": AxiosHeaderValue
  "Content-Encoding": AxiosHeaderValue
  Authorization: AxiosHeaderValue
}>
type defaultHeadersType = () => headerDef;

const defaultHeaders: defaultHeadersType = () => {
  return {
    Authorization: `Bearer ${getJWT()}`,
    'x-time-user': getXTimeUser()
  }
}

const { get, post, patch, delete: delAxios, } = axios.create({
  baseURL: BFF_URL_BASE
});

const GET = <T>(url: string, headers?: headerDef) => {
  return get<T>(
    url,
    {
      headers: {
        ...defaultHeaders(),
          ...headers
      }
    }
  );
}

const POST = <R, T>(url: string, data: T, headers?: headerDef) => {
  return post<T, AxiosResponse<R>>(url, data, {
    headers: {
      ...defaultHeaders(),
      ...headers,
    }
  });
}

const PATCH = <R, T>(url: string, data: T, headers?: headerDef) => {
  return patch<T, AxiosResponse<R>>(url, data, {
    headers: {
      ...defaultHeaders(),
      ...headers,
    }
  });}

const DELETE = (url: string, headers?: headerDef) => {
  return delAxios(url, {
    headers: {
      ...defaultHeaders(),
      ...headers,
    }
  })
}

export const HTTP = {
  GET,
  POST,
  PATCH,
  DELETE,
}