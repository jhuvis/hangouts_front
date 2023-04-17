import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Search  from './pages/Search'
import Details  from './pages/Details'
import SignInDisplay from "./SignInDisplay/SignInDisplay";
import SignUpDisplay from "./SignUpDisplay/SignUpDisplay";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
            <Routes>
              <Route path="/" element={<Search/>} />
              <Route path="/details/:placeId" element={<Details/>} />
              <Route path="/sign-in" element={<SignInDisplay />} />
              <Route path="/sign-up" element={<SignUpDisplay />} />
            </Routes>
      </Router>
    </>
  );
};

export default App;

