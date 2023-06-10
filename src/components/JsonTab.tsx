import { useCallback, useContext } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { AppContext } from "./AppContext";
import Tab from "react-bootstrap/esm/Tab";
import { okaidia } from '@uiw/codemirror-theme-okaidia';

const JsonTab = () => {
  const { jsonValue, setJsonValue } = useContext(AppContext);

  const handleChange = useCallback((value: string) => {
    setJsonValue(value);
  }, [setJsonValue]);

  return (
    <Tab.Content className='p-3 border-top-0 border' id='json'>
      <div className='overflow-auto' style={{ maxHeight: '200px' }}>
      <CodeMirror
        value={jsonValue}
        height="200px"
        extensions={[json()]}
        onChange={handleChange}
        theme={okaidia}
      />
      </div>
    </Tab.Content>
  );
}

export default JsonTab;