import React, { useEffect } from 'react';
import './confirmationPage.css';

function ConfirmationPage() {
    useEffect(() => {
        // Create a <link> element for Bootstrap CSS
        const bootstrapLink = document.createElement('link');
        bootstrapLink.rel = 'stylesheet';
        bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css';
    
        // Create a <link> element for Google Fonts
        const fontsLink = document.createElement('link');
        fontsLink.rel = 'stylesheet';
        fontsLink.href = 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;1,300;1,900&family=Lilita+One&display=swap';
    
        // Append both <link> elements to the <head> section of the document
        document.head.appendChild(bootstrapLink);
        document.head.appendChild(fontsLink);
    
        // Clean up function to remove the <link> elements when the component unmounts
        return () => {
          document.head.removeChild(bootstrapLink);
          document.head.removeChild(fontsLink);
        };
      }, []);
  return (
    
    <div className='body'>
        <div className="confirmationtext">
          <p>Your order has been placed!</p>
          <p>Order ID: 2147</p>
          <p>An order confirmation has been sent to your email.</p>
        </div>
      </div>
    // </div>
  );
}

export default ConfirmationPage;
