import React, {useState, useEffect} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import { Nav, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavItem, NavLinks, NavItemBtn, NavBtnLink} from './NavbarElement'


const Navbar = () => {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click)

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)

  return (
    <>
    <IconContext.Provider value={ { color: '#463f3a'}}>
    <Nav>
        <NavbarContainer>
            <NavLogo to="/">
                <NavIcon />
                Laundry
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to='/'>Home</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='/transaksi'>Transaksi</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='/laporan'>Laporan</NavLinks>
              </NavItem>
              <NavItemBtn>
                {button ? (
                  <NavBtnLink to="/logout">
                    <Button primary>Logout</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to='/logout'>
                    <Button fontBig primary>
                      LogOut
                    </Button>
                  </NavBtnLink>
                )}
              </NavItemBtn> 
            </NavMenu>
        </NavbarContainer>
    </Nav>
    </IconContext.Provider>
    </>
  )
}

export default Navbar