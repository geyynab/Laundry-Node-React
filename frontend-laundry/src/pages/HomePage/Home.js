import React from 'react';
import { homeObjOne } from './Data';
import { InfoSection} from '../../components'
import NavbarOwner from '../../components/Navbar/NavbarOwner'
import Navbar from '../../components/Navbar/Navbar'
import NavbarKasir from '../../components/Navbar/NavbarKasir'

class Home extends React.Component {
  constructor() {
      super()
      this.state = {
        token: "",
        username: "",
        userId: 0,
        role: ""
      }
  
      if (localStorage.getItem('token')) {
        // if (localStorage.getItem('role') === "admin") {
          this.state.role = localStorage.getItem('role')
          this.state.token = localStorage.getItem('token')
          this.state.username = localStorage.getItem('name')
          this.state.id_outlet = localStorage.getItem('id_outlet')
        // }else{
        //   window.alert("You are not an admin")
        //   window.location = '/login'
        // }
      } 
      else {
        window.location = "/login"
      }
  
    }

  render(){
      return(
          <>
          {this.state.role == "kasir" && <NavbarKasir />}
          {this.state.role == "owner" && <NavbarOwner />}
          {this.state.role == "admin" && <Navbar />}
          <InfoSection {...homeObjOne} />
          </>
      )
  }
}

export default Home;