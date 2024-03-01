import React from 'react'
import { AllFoot, Newslatter, Foot, HList, Flex, Locate, Div } from '../../App.styles';
import { MdOutlineMail } from 'react-icons/md'
import { TfiLocationPin } from 'react-icons/tfi'
const FooterPage = () => {
  return (
   <>
   <AllFoot>
    <Foot>
     <div>
        <h2>Artistic Elegance Gallery</h2>
     </div>
      <HList>
        <div className='hom'>
            <li><a href='#home' id='nan'>Home</a></li>
            <li><a href='#about' id='nan'>About</a></li>
        </div>
        <div className='gal'>
            <li><a href='#gallery' id='nan'>Gallery</a></li>
            <li><a href='#contact' id='nan'>Contact</a></li>
        </div>
     </HList>
    </Foot>
     <Newslatter>
        <div className='nL'>
           <h1>new's Letter</h1>
           <p>get daily update’s about auctions, arts amd more</p>
        </div>
        <div>
            <input type="text" placeholder='Enter your email' />
            <button>subscribe</button>
        </div>
        <Flex>
      
          <Locate>
            <h3>Reach Us</h3>
            <p><MdOutlineMail size={20} id="con"/> contact@artisticelegancegallery.com </p>    
            <p><TfiLocationPin size={20} /> Lagos, Nigeria</p>
          </Locate>
        </Flex>
     </Newslatter>
   </AllFoot>
   </>
  )
}

export default FooterPage