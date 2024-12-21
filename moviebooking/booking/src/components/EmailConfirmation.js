import React from 'react';

function EmailConfirmation() {
  return (
    <div style={styles.orderbox}>
      <div style={styles.confirmationBox}>
        <div style={styles.confirmationtext}>
          <p>A password reset link has been sent to your email!</p>
          <p>Remember your password? <a href="Login">Log In</a></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  orderbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ecf4ed',
    borderRadius: '5px',
  },
  confirmationBox: {
    backgroundColor: '#598392',
    padding: '20px',
    borderRadius: '10px',
    border: '10px solid white', // Add white border
  },
  confirmationtext: {
    textAlign: 'center',
    fontSize: '24px',
    color: 'black',
  },
};

export default EmailConfirmation;
