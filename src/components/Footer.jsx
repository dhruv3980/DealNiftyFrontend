import React from 'react'
import "../componentStyles/Footer.css"
import {Phone, Mail, GitHub, LinkedIn} from '@mui/icons-material'

const Footer = () => {
  return (
    <footer className='footer'>


        <div className="footer-container">
            {/** section -1 */}
            <div className="footer-section contact">
                <h3>Contact Us</h3>
                <p ><Phone fontSize='sm' /> Phone:+91997600889</p>
                <p><Mail fontSize='sm'/>Email:rathoreofficial398@gmail.com</p>
            </div>

            {/**section -2 */}
            
            <div className="footer-section social">
                <h3>Follow me</h3>
                <div className="social-links">
                    <a href="https://github.com/dhruv3980" target='_blank' >


                        <GitHub className='social-icon'/>
                    
                    </a>

                    <a href="https://www.linkedin.com/in/dhruvsahu398/">
                        <LinkedIn className='social-icon'></LinkedIn>
                    
                    </a>
                </div>

                
            </div>

            {/** section 3 */}

            <div className="footer-section about">
                    <h3>About</h3>
                    <p> DealNifty is your trusted online marketplace, bringing you the best deals on fashion, electronics, and more – all in one place.</p>
            </div>
        </div>


        {/** footer-bottom */}

        <div className="footer-bottom">
            <p>&copy; 2025 DealNifty. All rights reserved</p>
        </div>
        

        
    </footer>
  )
}

export default Footer
