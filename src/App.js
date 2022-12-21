import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import SignUp from './components/SignUp.js';
import StyledNav from './components/StyledNav.js';
import Login from './components/Login.js';
import AddBooks from './components/AddBooks.js';
import AdminStyledNav from './components/AdminStyledNav.js';
import ViewBooks from './components/ViewBooks.js';
import axios from 'axios';
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element=
          {<div>
            <StyledNav />
            <Outlet />
          </div>} >
          <Route path='signup' element={<div><SignUp /></div>} />
          <Route path='books' element={<div>books</div>} />
          <Route path='login' element={<Login />} />
        </Route>

        <Route path="admin" element={<
          div>
          <AdminStyledNav />
          <Outlet />
        </div>}>
          <Route path="addbooks" element={<div><AddBooks /></div>} />
          <Route path="viewbooks" element={<ViewBooks />} />
          <Route path="edit_book/:isbn" element={<ViewBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
