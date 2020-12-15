import logo from './logo.svg';
import './App.css';
import { useDispatch} from 'react-redux';
import { setDisplayingPanel, setToken, setUser } from './redux/actions';
import ApplicationRoutes from './ApplicationRoutes';
import TablePanel from './components/mainPanels/tables/TablePanel';
import { removeItem } from './requests/restaurant';

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
    var user = localStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
    dispatch(setDisplayingPanel(<TablePanel/>));
  }

 /* const dispatch = useDispatch();
  dispatch(setToken(localStorage.getItem("token")));*/
    return ApplicationRoutes();
  
}

export default App;
