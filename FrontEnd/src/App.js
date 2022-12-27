import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import SignUp from './components/SignUp.js';
import StyledNav from './components/StyledNav.js';
import Login from './components/Login.js';
import AddBooks from './components/AddBooks.js';
import AdminStyledNav from './components/AdminStyledNav.js';
import ViewBooks from './components/ViewBooks.js';
import axios from 'axios';
import EditBook from './components/EditBook.js';
import CustomerViewBooks from './components/CustomerViewBooks.js';
import Bookdetails from './components/Bookdetails.js';
import Cart from './components/cart.js';
import Home from './components/Home.js';
import AdminLogin from './components/AdminLogin.js';
import ViewWishlist from './components/ViewWishlist.js';

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
          <Route path='home' element={<div><Home /></div>} />
          <Route path='signup' element={<div><SignUp /></div>} />
          <Route path='books' element={<CustomerViewBooks />} />
          <Route path="books/:isbn" element={<Bookdetails />} />
          <Route path='login' element={<Login />} />
          <Route path='cart' element={<Cart />} />
          <Route path='wishlist' element={<ViewWishlist />} />
        </Route>

        <Route path="admin" element={<
          div>
          <AdminStyledNav />
          <Outlet />
        </div>}>
          <Route path="addbooks" element={<div><AddBooks /></div>} />
          <Route path="login" element={<div><AdminLogin /></div>} />
          <Route path="viewbooks" element={<div><ViewBooks /><Outlet /></div>} />
          <Route path="viewbooks/edit_book/:isbn" element={<EditBook />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
