import React, {useState} from 'react';
import axios from 'axios'
import history from './../history'
//import {Link} from 'react-router-dom'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  // MDBDropdown,
  // MDBDropdownToggle,
  // MDBDropdownMenu,
  // MDBDropdownItem,
  // MDBDropdownLink,
  MDBCollapse
} from 'mdb-react-ui-kit';

const handleSignOut = function(e) {
  e.preventDefault();
  axios({
    method: 'DELETE',
    url: 'http://localhost:3001/auth/sign_out',
    data: JSON.parse(localStorage.user)
  }).then(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('currentUserCanEdit')
    window.location = '/'
  })
}

function AppHeader() {
  const [showBasic, setShowBasic] = useState(false);
  const currentUser = localStorage.getItem('user')
  return (<MDBNavbar expand='lg' light="light" bgColor='light'>
    <MDBContainer fluid="fluid">
      <MDBNavbarBrand href='/' className="text-danger">eventlite</MDBNavbarBrand>
      <MDBNavbarToggler aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation' onClick={() => setShowBasic(!showBasic)}>
        <MDBIcon icon='bars' fas="fas"/>
      </MDBNavbarToggler>

      <MDBCollapse navbar="navbar" show={showBasic}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 justify-content-end'>
          {
            currentUser
              ? <><MDBBtn outline color="success" className='me-2' type='button' onClick={() => history.push('/create')}>
                  Create Event
                </MDBBtn>
              <span className='navbar-text'>
                  {JSON.parse(currentUser).uid}
                </span>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/' onClick={handleSignOut}>Sign Out</MDBNavbarLink>
                </MDBNavbarItem></>
              : <><MDBNavbarItem>
                  <MDBNavbarLink href="/signup">Signup</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">Login</MDBNavbarLink>
                </MDBNavbarItem></>
          }
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>)
}

export default AppHeader
