import React, { useEffect } from 'react'

const Logout = () => {
    if (window.confirm("Are you sure to logout?")) {
     window.location = '/login'
     localStorage.removeItem("nama");
     localStorage.removeItem("user");
     localStorage.removeItem("token");
     localStorage.removeItem("id");
     localStorage.removeItem("role");
     localStorage.removeItem("id_user");
     localStorage.removeItem("id_transaksi");
     localStorage.removeItem("id_outlet");
    }
   
  return (
    <div></div>
  )
}

export default Logout