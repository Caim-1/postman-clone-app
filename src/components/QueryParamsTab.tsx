import { useContext } from "react";
import { AppContext } from "./AppContext";
import Tab from "react-bootstrap/esm/Tab";
import Button from "react-bootstrap/esm/Button";
import InputTemplate from "./Template";

const QueryParamsTab = () => {
  const { queryParams, handleAdd } = useContext(AppContext);
  const type = 'queryParams';

  return (
    <Tab.Content className='p-3 border-top-0 border' id='query-params'>
      {queryParams.map((item) => (
        <InputTemplate
          key={item.id}
          item={item}
          type={type}
        />
      ))}
      <Button
        type='button'
        variant='outline-success'
        className='mt-2'
        onClick={() => handleAdd(type)}
      >
        Add
      </Button>
    </Tab.Content>
  );
}

export default QueryParamsTab;