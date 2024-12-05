import React from "react";
import "./index.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Sobre Nós</h3>
          
          <p> Descubra os melhores filmes e séries no nosso site. Atualizamos</p>
           <p> constantemente para oferecer a você o conteúdo mais recente e</p>
           <p> emocionante.</p>
          
        </div>
        <div className="footer-section contact">
          <h3>Contato</h3>
          <p>Email: contato@meusite.com</p>
          <p>Telefone: +55 (11) 1234-5678</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MeuSite. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
