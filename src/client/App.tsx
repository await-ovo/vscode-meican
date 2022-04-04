import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Layout from './common/components/Layout';
import { PAGE_ROUTE_URL } from './common/utils';
import { history } from '../common/history';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={true}
      />
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index={true} element={<Home />} />
            <Route path={PAGE_ROUTE_URL.profile} element={<Profile />} />
            <Route path={PAGE_ROUTE_URL.login} element={<Login />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </>
  );
};

export default App;
