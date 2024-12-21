import React from 'react';

function RegConfirmation() {
  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.orderbox}>
          <div style={styles.confirmationText}>
            <p>Your account registration has been completed!</p>
            <p>A registration confirmation has been sent to your email.</p>
          </div>
        </div>
      </div>
      <p style={{...styles.login, marginTop: '30px'}}>Already have an account? <a href="Login" style={styles.link}>Log In</a></p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ecf4ed',
    fontFamily: 'Arial, sans-serif',
  },
  wrapper: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  orderbox: {
    backgroundColor: '#598392',
    padding: '20px',
    borderRadius: '5px',
    color: 'white',
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: '20px',
    lineHeight: '1.5',
  },
  login: {
    fontSize: '16px',
    color: 'black',
  },
  link: {
    textDecoration: 'none',
    color: '#3a7bfd',
  },
};

export default RegConfirmation;
