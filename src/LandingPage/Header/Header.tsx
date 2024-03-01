import { HeaderStyle, Title, List, Nav_Link, Desc, HamList, Div,} from '../../App.styles'
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io'
import React, { useState } from 'react';



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)

    }
    return (
        <>
            <HeaderStyle>
                <div>
                    <Title>
                        <p>Artistic Elegance Gallery</p>   
                     <Div>
                        {!isMenuOpen && <GiHamburgerMenu id='toggle' className="icon" onClick={toggleMenu}/>}
                           {isMenuOpen && <HamList className={`topnav ${isMenuOpen ? "responsive" : ""}`}>
                           <IoMdClose  onClick={toggleMenu} />
                            <a href='#home' id='nan'>Home</a>
                            <a href='#about' id='nan'>About</a>
                            <a href='#gallery' id='nan'>Gallery</a>
                            <a href='/login' id='nan'>Login</a>
                           
                            <Nav_Link href='/register' id='nav-link'>Get Started</Nav_Link>
                        </HamList>}
                     </Div>              
                      
                        <List>
                            <a href='#home' id='nan'>Home</a>
                            <a href='#about' id='nan'>About</a>
                            <a href='#gallery' id='nan'>Gallery</a>
                            <a href='/login' id='nan'>Login</a>
                            <Nav_Link href='/register' id='nav-link'>Get Started</Nav_Link>
                        </List>
                      
                    </Title>
                </div>
                <Desc>
                    <div>
                        <h1> Bridge the gap <br />
                            between artists <br />
                            and art <br />
                            enthusiast</h1>
                        <p>"Embark on a Visual Odyssey: <br></br>
                            Our Art Gallery, Where Imagination Flourishes, <br></br>
                            Inviting You to Explore the Endless Tapestry of Creativity!" </p>
                        <button>Place an order</button>
                    </div>
                </Desc>
            </HeaderStyle>
        </>
    )
}

export default Header