import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartItems } from '../../redux/action';
import { searchQueryContext } from '../../navigationStack/navigation';


const NavBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { login } = useContext(searchQueryContext);
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cartItems)
  // console.log(cart)
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    document.title = "E-COM";
    dispatch(cartItems(token))
  }, [dispatch, cart, token])


  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery('');
  };
  const navStyle={ color: "#000080", fontSize: "24px",textDecoration:"none",padding:"7px",}

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ width: "100%" }}>
      <Container fluid style={{ color: 'blue', fontSize: "20px", backgroundColor: "lightblue" }}>
        <Navbar.Brand style={{ color: "#800000", fontSize: "40px" }} href="#"> E-COM</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', width: "100%" }}
            navbarScroll
          >

            <Link to="/" style={navStyle}  >Home </Link>
            {login ?
              <Link to="/profile" style={navStyle}>Profile</Link> :
              <Link to="/signIn" style={navStyle}>Sign In</Link>
            }
            {/* <Link to="/signIn" style={navStyle} >signIn </Link> */}
            <Link to="/orders" style={navStyle} >Orders</Link>
            {/* <Nav.Link href="#" disabled>

            </Nav.Link> */}

          </Nav>

          <Form className="d-flex" style={{ width: "100%" }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
          <Link to="/cartItems">
            {/* <span style={{ fontSize: '20px', }}>{cartItemCount}</span> */}
            <img src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png" className="btn btn-primary m-2" style={{ width: "60px", paddingLeft: "20px" }} alt="Add To Cart" />

            <span className="position-absolute top-5 start-80 translate-middle badge rounded-pill bg-danger mt-2 ">
              {cart.length}
              <span className="visually-hidden">items in cart</span>
            </span>

          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
