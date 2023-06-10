import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { AppContext, Params } from "./AppContext";

const InputTemplate = ({ item, type }: { item: Params, type: string }) => {
  const { handleRemove, handleChange } = useContext(AppContext);

  return (
    <div className='input-group my-2'>
      <input
        type='text'
        id='key'
        className='form-control'
        placeholder='Key'
        value={item.key}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, item, type)}
      />
      <input
        type='text'
        id='value'
        className='form-control'
        placeholder='Value'
        value={item.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, item, type)}
      />
      <Button
        type='button'
        variant='outline-danger'
        onClick={() => handleRemove(item, type)}
      >
        Remove
      </Button>
    </div>
  );
}

export default InputTemplate;