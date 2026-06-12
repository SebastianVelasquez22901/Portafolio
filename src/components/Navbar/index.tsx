import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { SiXml } from 'react-icons/si';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  Span,
  NavItems,
  NavLink,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
  LangButton,
} from './NavbarStyledComponent';
import { usePortfolio } from '../../context/PortfolioContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, constants } = usePortfolio();
  const { Bio } = constants;

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo href="#about">
          <SiXml size="3rem" />
          <Span>Portfolio</Span>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">{lang === 'es' ? 'Yo' : 'Me'}</NavLink>
          <NavLink href="#skills">{lang === 'es' ? 'Habilidades' : 'Skills'}</NavLink>
          <NavLink href="#experience">{lang === 'es' ? 'Experiencia' : 'Experience'}</NavLink>
          <NavLink href="#education">{lang === 'es' ? 'Educacion' : 'Education'}</NavLink>
        </NavItems>
        <ButtonContainer>
          <LangButton onClick={() => setLang('es')} $active={lang === 'es'}>ES</LangButton>
          <LangButton onClick={() => setLang('en')} $active={lang === 'en'}>EN</LangButton>
          <GitHubButton href={Bio.github} target="_blank">Github</GitHubButton>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu $isOpen={isOpen}>
            <MobileLink href="#about" onClick={() => setIsOpen(false)}>
              {lang === 'es' ? 'Sobre mi' : 'About me'}
            </MobileLink>
            <MobileLink href="#skills" onClick={() => setIsOpen(false)}>
              {lang === 'es' ? 'Habilidades' : 'Skills'}
            </MobileLink>
            <MobileLink href="#experience" onClick={() => setIsOpen(false)}>
              {lang === 'es' ? 'Experiencia' : 'Experience'}
            </MobileLink>
            <MobileLink href="#education" onClick={() => setIsOpen(false)}>
              {lang === 'es' ? 'Educacion' : 'Education'}
            </MobileLink>
            <LangButton onClick={() => { setLang('es'); setIsOpen(false); }} $active={lang === 'es'}>ES</LangButton>
            <LangButton onClick={() => { setLang('en'); setIsOpen(false); }} $active={lang === 'en'}>EN</LangButton>
            <GitHubButton
              style={{ padding: '10px 16px', width: 'max-content' }}
              href={Bio.github}
              target="_blank"
            >
              Perfil github
            </GitHubButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
