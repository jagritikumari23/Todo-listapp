import React from 'react'

const Footer = () => {
  let footerStyle = {
    position: "relative",  // Changed from fixed to relative
    width: "100%",
    backgroundColor: "#343a40",
    textAlign: "center",
    padding: "10px 0",
    marginTop: "50px"  // Added margin to separate from content
  };

  return (
    <footer className="bg-dark text-light py-3" style={footerStyle}>
      <p className="text-center mb-0">
        Copyright &copy; TaskFlow
      </p>
    </footer>
  );
}

export default Footer;