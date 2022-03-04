import React from 'react';

import './Footer.css'

const Footer = () => {
    return (
        <div className='main-footer'>
            <div className='footer-container'>
                <div className='footer-row'>
                    {/*Column1*/}
                    <div className='footer-col'>
                        <h4>company</h4>
                        <ul className='list-unstyled'>
                            <li>about us</li>
                            <li>our services</li>
                            <li>privacy policy</li>
                            <li></li>
                        </ul>
                    </div>

                    {/*Column2*/}
                    <div className='footer-col'>
                        <h4>get help</h4>
                        <ul className='list-unstyled'>
                            <li>FAQ</li>
                            <li>Shipping</li>
                            <li>returns</li>
                            <li>payment options</li>
                        </ul>
                    </div>

                    {/*Column3*/}
                    <div className='footer-col'>
                        <h4>online shop</h4>
                        <ul className='list-unstyled'>
                            <li>watch</li>
                            <li>bag</li>
                            <li>shoes</li>
                            <li>dress</li>
                        </ul>
                    </div>

                    {/*Column4*/}
                    <div className='footer-col'>
                        <h4>follow us</h4>
                        <ul className='social-links'>
                            <li><i className='fab fa-facebook-f'/></li>
                            <li><i className='fab fa-twitter'/></li>
                            <li><i className='fab fa-instagram'/></li>
                            <li><i className='fab fa-linkedin-in'/></li>
                        </ul>
                    </div>
                </div>
               
            </div>
        </div>
    )
}


export default Footer;