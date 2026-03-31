import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Our Book Management System</h1>
      <p style={styles.description}>
        Welcome to our intelligent Book Management System! This platform is designed to
        help you organize, manage, and predict trends in your book collection efficiently.
        With features like advanced search, predictive analysis, and seamless user
        experience, our system makes book management easier than ever before......
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Organize and catalog your books with ease</li>
        <li style={styles.listItem}>Advanced search functionality</li>
        <li style={styles.listItem}>Predictive insights into your collection</li>
        <li style={styles.listItem}>Responsive and user-friendly design</li>
      </ul>
      <p style={styles.footer}>
        We hope you enjoy using our system to enhance your reading experience!
      </p>
      <button style={styles.button}>Get Started</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    maxWidth: '900px',
    margin: '40px auto',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
  },
  heading: {
    color: '#2c3e50',
    fontSize: '32px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  description: {
    color: '#34495e',
    fontSize: '18px',
    lineHeight: '1.8',
    marginBottom: '30px',
    textAlign: 'justify',
    fontWeight: '300',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: '0 auto 30px',
    maxWidth: '600px',
    textAlign: 'left',
  },
  listItem: {
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    fontSize: '16px',
    margin: '10px 0',
    padding: '10px 15px',
    borderRadius: '5px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  listItemHover: {
    backgroundColor: '#dfe6e9',
  },
  footer: {
    color: '#95a5a6',
    fontSize: '16px',
    marginTop: '20px',
    fontStyle: 'italic',
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    backgroundColor: '#2980b9',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#3498db',
  },
  containerHover: {
    transform: 'scale(1.02)',
  },
};

export default About;
