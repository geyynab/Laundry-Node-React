import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Outlet from './pages/Outlet/Outlet';
import Member from './pages/Member/Member';
import Login from './pages/Login';
import Paket from './pages/Paket/Paket';
import User from './pages/User/User';
import Transaksi from './pages/Transaksi/Transaksi';
import MemberChoose from './pages/Member/MemberChoose'
import Cart from './pages/Cart/Cart';
import DetailTransaksi from './pages/Transaksi/DetailTransaksi'
import Logout from './pages/Logout';
import Laporan from './pages/Transaksi/Laporan'
import Cetak from './pages/Transaksi/Cetak'

function App() {
  return (
    <Router>
      <GlobalStyle />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/outlet" exact element={<Outlet/>} />
        <Route path="/paket" exact element={<Paket/>} />
        <Route path="/member" exact element={<Member/>} />
        <Route path="/memberchoose" exact element={<MemberChoose/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/user" exact element={<User/>} />
        <Route path="/cart" exact element={<Cart/>} />
        <Route path="/transaksi" exact element={<Transaksi/>} />
        <Route path="/detail_transaksi/byTransaksi/:id/:id" exact element={<DetailTransaksi/>} />
        <Route path="/logout" exact element={<Logout/>} />
        <Route path="/laporan" exact element={<Laporan/>} />
        <Route path="/cetak" exact element={<Cetak/>} />
      </Routes>
    </Router>
  );
}

export default App;
