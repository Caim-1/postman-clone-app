import Context from './components/AppContext';
import Postman from './components/Postman';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <Context>
      <Postman />
    </Context>
  );
}