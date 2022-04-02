import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Layout from './common/components/Layout';
import { PAGE_ROUTE_URL } from './common/utils';
import { history } from '../common/history';

const App = () => {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />}></Route>
          <Route path={PAGE_ROUTE_URL.profile} element={<Profile />}></Route>
          <Route path={PAGE_ROUTE_URL.login} element={<Login />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
