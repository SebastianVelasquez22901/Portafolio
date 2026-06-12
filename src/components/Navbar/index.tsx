import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  SPath,
  VPath,
  FlourishPath,
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

const SVSignature = () => (
  <svg
    viewBox="0 0 68 62"
    width="68"
    height="52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', filter: 'drop-shadow(0 0 5px rgba(133, 76, 230, 0.55))' }}
  >
    <SPath
      pathLength={1}
      d="M 22,7 C 10,3 1,10 4,19 C 7,27 20,26 22,35 C 24,44 13,49 3,45"
      stroke="#854CE6"
      strokeWidth={3.5}
      strokeLinecap="round"
      fill="none"
    />
    <VPath
      pathLength={1}
      d="M 32,7 L 45,45 L 58,7"
      stroke="#854CE6"
      strokeWidth={3.5}
      strokeLinecap="round"
      fill="none"
    />
    <FlourishPath
      pathLength={1}
      d="M 3,45 C 20,58 44,58 58,45"
      stroke="#854CE6"
      strokeWidth={2.2}
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, constants } = usePortfolio();
  const { Bio } = constants;

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo href="#about">
          <SVSignature />
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
