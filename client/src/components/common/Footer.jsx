import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '20px 0',
            textAlign: 'center'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <p>&copy; {new Date().getFullYear()} Multi-Camera Web App. All rights reserved.</p>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '10px 0 0',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px'
                }}>
                    <li><a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a></li>
                    <li><a href="/terms-of-service" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</a></li>
                    <li><a href="/contact-us" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;