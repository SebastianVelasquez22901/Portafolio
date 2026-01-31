import React from 'react'
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileNavLogo, MobileLink } from './NavbarStyledComponent'
import { FaBars } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import { SiXaml } from "react-icons/si";
import styled from "styled-components";

const Navbar = ({ setLang, lang, constants }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();
  const { Bio } = constants;

  const LangButton = styled.button`
    background: ${({ active, theme }) => active ? theme.primary : "transparent"};
    color: ${({ active, theme }) => active ? "#fff" : theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
    border-radius: 8px;
    margin: 0 2px;
    padding: 6px 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    opacity: ${({ active }) => active ? 1 : 0.7};
    &:hover {
      background: ${({ theme }) => theme.primary};
      color: #fff;
      opacity: 1;
    }
  `;

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <a style={{ display: "flex", alignItems: "center", color: "white", marginBottom: '20;', cursor: 'pointer' }}>
            <SiXaml size="3rem" /> <Span>Portfolio</Span>
          </a>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">{lang === "es" ? "Yo" : "Me"}</NavLink>
          <NavLink href='#skills'>{lang === "es" ? "Habilidades" : "Skills"}</NavLink>
          <NavLink href='#experience'>{lang === "es" ? "Experiencia" : "Experience"}</NavLink>
          <NavLink href='#education'>{lang === "es" ? "Educacion" : "Education"}</NavLink>
        </NavItems>
        <ButtonContainer>
          <LangButton onClick={() => setLang("es")} active={lang === "es"}>ES</LangButton>
          <LangButton onClick={() => setLang("en")} active={lang === "en"}>EN</LangButton>
          <GitHubButton href={Bio.github} target="_blank">Github</GitHubButton>
        </ButtonContainer>
        {
          isOpen &&
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" onClick={() => setIsOpen(!isOpen)}>{lang === "es" ? "Sobre mi" : "About me"}</MobileLink>
            <MobileLink href='#skills' onClick={() => setIsOpen(!isOpen)}>{lang === "es" ? "Habilidades" : "Skills"}</MobileLink>
            <MobileLink href='#experience' onClick={() => setIsOpen(!isOpen)}>{lang === "es" ? "Experiencia" : "Experience"}</MobileLink>
            <MobileLink href='#education' onClick={() => setIsOpen(!isOpen)}>{lang === "es" ? "Educacion" : "Education"}</MobileLink>
            <GitHubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content'}} href={Bio.github} target="_blank">Perfil github</GitHubButton>
          </MobileMenu>
        }
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar