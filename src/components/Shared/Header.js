import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import './Header.css'
import BreadcumArea from './BreadcumArea';

const Header = () => {
  const [user] = useAuthState(auth);
  const [providerMessages, setProviderMessages] = useState([]);
  const [replies, setReplies] = useState([]);
  const [myServiceOrders, setMyServiceOrders] = useState([]);
  const [categoris, setCategoris] = useState([]);
  const [logo, setLogo] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/logo`
    fetch(url)
      .then(res => res.json())
      .then(data => setLogo(data));
  }, []);

  useEffect(() => {
    const url = `http://localhost:5000/categoris`
    fetch(url)
      .then(res => res.json())
      .then(data => setCategoris(data));
  }, []);


  const handleSignout = () => {
    signOut(auth);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/messages`)
      .then(res => res.json())
      .then(result => setProviderMessages(result))
  }, [providerMessages])

  useEffect(() => {
    fetch(`http://localhost:5000/replies`)
      .then(res => res.json())
      .then(result => setReplies(result))
  }, []);

  useEffect(() => {
    const url = `http://localhost:5000/myserviceorder?email=${user?.email}`
    fetch(url)
      .then(res => res.json())
      .then(info => setMyServiceOrders(info));
  }, [user]);

  return (
    <>
      {/* <header>
            <Navbar className='p-3 menu-bar' collapseOnSelect expand="lg">
                <Container>
                    {
                        logo.map(l => <Navbar.Brand as={Link} to="/"><img className='logo' src={l.logoImg} alt="" /></Navbar.Brand>)
                    }
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/"><i class="fa-solid fa-house-chimney"></i></Nav.Link>
                            
                            <NavDropdown title="Services" id="collasible-nav-dropdown">
                                {
                                    categoris.map(category => 
                                        <NavDropdown.Item as={Link} to={`/category/${category.slug}`} id="dropdown-menu">{category.categoryName}</NavDropdown.Item>
                                        )
                                }
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <NavDropdown title={<i class="fa-solid fa-user-tie"></i>} id="collasible-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/dashboard"><i class="fa-solid fa-database"></i> Dashboard
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    :
                                    <></>
                            }
                        </Nav>
                        <Nav>
                        {
                                user ?
                                    <div>
                                        <Nav.Link className='notify' as={Link} to="/dashboard">
                                         <i class="fa-solid fa-bell"></i>
                                        {
                                            myServiceOrders.filter(order => order.provideremail === user?.email & order.reqUpdated === 'requpdated').length > 0 && <><span className='notify-count'>{
                                                myServiceOrders.filter(order => order.provideremail === user?.email & order.reqUpdated === 'requpdated').length
                                            }</span></>
                                        }
                                        
                                    </Nav.Link>
                                    </div>
                                    :
                                    <></>
                            }
                        </Nav>

                        <Nav>
                            {
                                user ?
                                    <div className='d-flex'>
                                        <Nav.Link as={Link} to="/messages"><i class="fa-solid fa-envelope"></i></Nav.Link>
                                        <div className='unread-message d-flex'>

                                            {providerMessages.filter(providerMessage => providerMessage.providerEmail === user.email).length > 0 &&
                                                <>
                                                    {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length === 0 && <></>}
                                                    {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length > 0 && <p>{replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length}</p>}

                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p>+{providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                </>
                                            }

                                            {providerMessages.filter(clientMessage => clientMessage.clientEmail === user.email).length > 0 &&
                                                <>
                                                    {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length === 0 && <span></span>}
                                                    {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length > 0 && <p>{replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length}</p>}

                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p>+{providerMessages.filter(providerMessage => providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                </>
                                            }


                                        </div>
                                        
                                    </div>
                                    :
                                    <></>
                            }
                         
                           
                            {
                                user ?
                                    <Nav.Link as={Link} to="/set-service" id="collasible-nav-dropdown"><i class="fa-solid fa-plus"></i>Add Service</Nav.Link>
                                    :
                                    <></>
                            }
                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <Nav.Link onClick={handleSignout} id="collasible-nav-dropdown"><i class="fa-solid fa-right-from-bracket"></i> Signout</Nav.Link>

                                    :
                                    <Nav.Link as={Link} to="/login" id="collasible-nav-dropdown"><i class="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                            }

                        </Nav>

                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </header> */}
      <header>
        <div id="header-sticky" className="menu-area transparent-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="logo">
                  <Link to="/">
                    <img
                      src="https://themebeyond.com/html/makplus/makplus/img/logo/s_logo.png"
                      className="transparent-logo"
                      alt="Logo"
                    />
                    <img src="https://themebeyond.com/html/makplus/makplus/img/logo/logo.png" className="sticky-logo" alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-6 col-sm-6 text-right">
                <div className="main-menu s-main-menu d-none d-lg-inline-block">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                        
                      </li>
                      
                     
                      <li>
                        <a href="#">Categoris</a>
                        <ul className="submenu">
                          {
                            categoris.map(category =>
                              <li>
                                <Link to={`/category/${category.slug}`}>{category.categoryName}</Link>
                              </li>
                            )
                          }

                        </ul>
                      </li>
                      
                    </ul>
                  </nav>
                </div>
                {
                  user ?
                    <div className="shop-cart s-shop-cart position-relative d-none d-sm-inline-block">
                      <Link to='/messages'>
                        <i className="fas fa-bell" />
                      </Link>
                      <span>{
                        providerMessages.filter(pmessage => pmessage.whoSent === 'clientSent' && pmessage.messageStatus === 'unRead' && pmessage.providerEmail === user?.email).length
                      }</span>
                      <div className="menu-cart-widget">
                        <ul>
                          {
                            providerMessages.map(pmessage => pmessage.whoSent === 'clientSent' && pmessage.messageStatus === 'unRead' && pmessage.providerEmail === user?.email &&
                              <li className="menu-cart-product-list">
                                <div className="cart-product-thumb">
                                  <a href="#">
                                    <img src="img/product/check-out01.jpg" alt="" />
                                  </a>
                                </div>
                                <div className="cart-product-content">
                                  <h5>
                                    <Link to={`/inbox/${pmessage._id}`}>{pmessage.serviceName}</Link>
                                  </h5>
                                  <span>{pmessage.clientName}</span>
                                </div>

                              </li>
                            )
                          }





                        </ul>
                        <div className="cart-price fix mb-15">
                          <span>Subtotal</span>
                          <span>$ 58.00</span>
                        </div>
                        <div className="cart-checkout-btn">
                          <Link to="/messages" className="btn">
                            Go To Inbox
                          </Link>
                        </div>
                      </div>
                    </div>
                    :
                    <></>
                }


                <div className="header-btn d-none d-xl-inline-block">
                  {
                    user ? 
                    <Link to="/dashboard" className="btn">
                    <i className="fas fa-user" />
                    My Account
                  </Link>
                  :
                  <Link to="/login" className="btn">
                    <i className="fas fa-user" />
                    Login/Join
                  </Link>
                  }
                 
                </div>
              </div>
              <div className="col-12">
                <div className="mobile-menu" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <BreadcumArea></BreadcumArea>

    </>
  );
};

export default Header;