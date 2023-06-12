import { useContext, useState } from 'react';
import { AppContext, Params } from './AppContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import QueryParamsTab from './QueryParamsTab';
import RequestHeadersTab from './RequestHeadersTab';
import JsonTab from './JsonTab';
import Results from './Results';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import prettyBytes from 'pretty-bytes';

axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  request.customData = request.customData || {};
  request.customData.startTime = new Date().getTime();
  return request;
});

axios.interceptors.response.use(updateEndTime, e => {
  return Promise.reject(updateEndTime(e.response));
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateEndTime(response: any) {
  response.customData = response.customData || {};
  response.customData.time = new Date().getTime() - response.config.customData.startTime;
  return response;
}

const Postman = () => {
  const { queryParams, requestHeaders, jsonValue, setResponseDetails, setResponseHeaders, setResponseSize } = useContext(AppContext);
  const [siteUrl, setSiteUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [selectValue, setSelectValue] = useState('GET');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let jsonData;

    try { // Check if provided JSON data is valid.
     jsonData = JSON.parse(jsonValue);
    } catch (error) {
      alert('Provided JSON data is invalid. Please make sure to format it correctly.');
      return;
    }

    axios({
      url: siteUrl,
      method: selectValue,
      params: keyValuePairsToObjects(queryParams),
      headers: keyValuePairsToObjects(requestHeaders),
      data: jsonData,
    })
    .catch(error => error)
    .then(response => {
      setResponseDetails(response);
      setResponseHeaders(Object.entries(response.headers));
      getSize(response);
    });
  }
  
  const getSize = (response: AxiosResponse) => { // Calculate the size of the response.
    const responseSize = prettyBytes(JSON.stringify(response.data).length + JSON.stringify(response.headers).length);
    setResponseSize(responseSize);
  }

  // Convert array of params/headers into an object of key value pairs.
  const keyValuePairsToObjects = (params: Params[]) => {
    const parsedArray = params.map((item) => {
      if (item.key === '') {
        return [];
      }
      return [item.key, item.value]
    });

    // Return an object of key value pairs.
    return Object.fromEntries(parsedArray);
  }

  return (
    <div className=' p-4'>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className='input-group mb-4' controlId=''>
          <Form.Select
            className='flex-grow-0 w-auto'
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value='GET'>GET</option>
            <option value='POST'>POST</option>
            <option value='PUT'>PUT</option>
            <option value='PATCH'>PATCH</option>
            <option value='DELETE'>DELETE</option>
          </Form.Select>
          <Form.Control
            type='url'
            placeholder='https://example.com'
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            required
          />
          <Button type='submit'>Send</Button>
        </Form.Group>
      
      </Form>
      <Tabs defaultActiveKey='query-params' role='tablist'>
          <Tab title='Query Params' eventKey='query-params' role='tab'>
            <QueryParamsTab />
          </Tab>
          <Tab title='Request Headers' eventKey='request-headers' role='tab'>
            <RequestHeadersTab />
          </Tab>
          <Tab title='JSON' eventKey='json' role='tab'>
            <JsonTab />
          </Tab>
        </Tabs>
      <Results />
    </div>
  );
}

export default Postman;