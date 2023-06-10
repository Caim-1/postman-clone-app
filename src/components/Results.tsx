import { useContext } from "react";
import { AppContext } from "./AppContext";
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import { okaidia } from '@uiw/codemirror-theme-okaidia';

const Results = () => {
  const { responseDetails, responseHeaders, responseSize } = useContext(AppContext);

  return (
    <div className='mt-5' style={{ display: responseDetails ? 'block' : 'none' }}>
      <h3>Response</h3>
      <div className='d-flex my-2'>
        <div className='me-3'>
          Status: <span>{responseDetails && responseDetails.status}</span>
        </div>
        <div className='me-3'>
          Time: <span>{responseDetails && responseDetails.customData?.time}</span>ms
        </div>
        <div className='me-3'>
          Size: <span>{responseSize}</span>
        </div>
      </div>

      <Tabs defaultActiveKey='body' role='tablist'>
          <Tab title='Body' eventKey='body' role='tab'>
            <Tab.Content className='p-3 border-top-0 border' id='query-params'>
              {responseDetails && <CodeMirror
                value={JSON.stringify(responseDetails.data, null, 2)}
                extensions={[json()]}
                editable={false}
                theme={okaidia}
                maxHeight='565px'
              />}
            </Tab.Content>
          </Tab>
          <Tab title='Headers' eventKey='headers' role='tab'>
            <Tab.Content className='p-3 border-top-0 border' id='query-params'>
              <div className='d-flex flex row' style={{ gap: '.5rem' }}>
                {responseHeaders && responseHeaders.map((element, index) => (
                  <div className='d-flex my-2' style={{ gap: '2rem' }} key={index}>
                    <div style={{ width: '110px' }}>{element[0]}:</div>
                    <div>{element[1]}</div>
                  </div>
                ))}
              </div>
            </Tab.Content>
          </Tab>
        </Tabs>
    </div>
  );
}

export default Results;