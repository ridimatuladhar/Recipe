import React from 'react'

const AboutUs = () => {
    return (
      <div className="about-us-container">
        <header className="about-us-header">
          <h3>About Us</h3>
        </header>
        <section className="about-us-content">
          <h4>
            Welcome to RecipeCart
          </h4>
          <p>We bring you a collection of delightful and delicious recipes from around the world. Our mission is to inspire home cooks of all levels by providing a platform to explore, share, and enjoy amazing recipes. We bring you a collection of delightful and delicious recipes from around the world. Our mission is to inspire home cooks of all levels by providing a platform to explore, share, and enjoy amazing recipes.</p>         
          
          
        </section>
        <footer className="about-us-footer">
          <p>&copy; {new Date().getFullYear()} RecipeCart.</p>
        </footer>
      </div>
    );
  };
  
  export default AboutUs;
