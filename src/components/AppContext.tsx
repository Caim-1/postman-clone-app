import { createContext, useState } from 'react';
import { AxiosResponse } from 'axios';

export type Params = {
  id: number,
  key: string,
  value: string,
}

interface ContextProps {
  queryParams: Params[],
  requestHeaders: Params[],
  handleAdd: (paramsType: string) => void,
  handleRemove: (item: Params, paramsType: string) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, item: Params, paramsType: string) => void,
  jsonValue: string,
  setJsonValue: (value: string) => void,
  responseDetails: AxiosResponse | null,
  setResponseDetails: (response: AxiosResponse) => void,
  responseHeaders: [string, string][] | null,
  setResponseHeaders: (headers: [string, string][]) => void,
  responseSize: string | null,
  setResponseSize: (value: string) => void,
}

export const AppContext = createContext<ContextProps>({
  queryParams: [{ id: 1, key: '', value: '' }],
  requestHeaders: [{ id: 1, key: '', value: '' }],
  handleAdd: () => [],
  handleRemove: () => [],
  handleChange: () => [],
  jsonValue: '',
  setJsonValue: () => '',
  responseDetails: null,
  setResponseDetails: () => [{}], // I don't think this should work, but it does.
  responseHeaders: null,
  setResponseHeaders: () => [],
  responseSize: '',
  setResponseSize: () => '',
});

const Context = ({ children }: { children: React.ReactNode }) => {
  const [queryParams, setQueryParams] = useState<Params[]>([{ id: 1, key: '', value: '' }]);
  const [requestHeaders, setRequestHeaders] = useState<Params[]>([{ id: 1, key: '', value: '' }]);
  const [jsonValue, setJsonValue] = useState<string>(`{\n  "example": "value"\n}`);
  const [responseSize, setResponseSize] = useState<string | null>(null);
  const [responseDetails, setResponseDetails] = useState<AxiosResponse | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<[string, string][] | null>(null);

  const handleAdd = (paramsType: string) => {
    if (paramsType === 'queryParams') {
      setQueryParams([...queryParams, { id: queryParams.length + 1, key: '', value: '' }]);
    } else if (paramsType === 'requestHeaders') {
      setRequestHeaders([...requestHeaders, { id: requestHeaders.length + 1, key: '', value: '' }]);
    }
  }

  const handleRemove = (item: Params, paramsType: string) => {
    if (paramsType === 'queryParams') {
      setQueryParams(queryParams.filter(element => element !== item));
    } else if (paramsType === 'requestHeaders') {
      setRequestHeaders(requestHeaders.filter(element => element !== item));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, item: Params, paramsType: string) => {
    if (paramsType === 'queryParams') {
      setQueryParams(queryParams.map(element => {
        if (element.id === item.id) {
          if (e.target.id === 'key') {
            return { ...element, key: e.target.value };
          } else if (e.target.id === 'value') {
            return { ...element, value: e.target.value };
          }
  
          return element;
        }
  
        return element;
      }));
    } else if (paramsType === 'requestHeaders') {
      setRequestHeaders(requestHeaders.map(element => {
        if (element.id === item.id) {
          if (e.target.id === 'key') {
            return { ...element, key: e.target.value };
          } else if (e.target.id === 'value') {
            return { ...element, value: e.target.value };
          }
  
          return element;
        }
  
        return element;
      }));
    }
  }

  const values = {
    queryParams,
    requestHeaders,
    handleAdd,
    handleRemove,
    handleChange,
    jsonValue,
    setJsonValue,
    responseSize,
    setResponseSize,
    responseDetails,
    setResponseDetails,
    responseHeaders,
    setResponseHeaders
  }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default Context;