import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from './redux/actions';
import ApplicationRoutes from './ApplicationRoutes';
import { setAuth } from './redux/reducers';

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
  const dispatch = useDispatch();

  if(localStorage.getItem("token")){   
    dispatch(setToken(localStorage.getItem("token")));
    dispatch(setUser(localStorage.getItem("user")));
  }

 /* const dispatch = useDispatch();
  dispatch(setToken(localStorage.getItem("token")));*/
    return ApplicationRoutes();
  
}

export default App;
