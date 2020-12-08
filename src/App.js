import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/actions';
import ApplicationRoutes from './ApplicationRoutes';

function App() {
  /*const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  return (
    <>
    hey + {token}
    <br/>
    <button onClick={()=> dispatch(setToken("newtoken1"))}>setToken</button>
    </>
  );*/
 /* const dispatch = useDispatch();
  dispatch(setToken(localStorage.getItem("token")));*/
    return ApplicationRoutes();
  
}

export default App;
