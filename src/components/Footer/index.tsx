import styled from 'styled-components';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { usePortfolio } from '../../context/PortfolioContext';

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.h1`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
`;

const FooterNav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;

const FooterNavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`;

const Footer = () => {
  const { constants } = usePortfolio();
  const { Bio, lang } = constants;

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Sebastian Velasquez</Logo>
        <FooterNav>
          <FooterNavLink href="#about">{lang === 'es' ? 'Sobre mi' : 'About me'}</FooterNavLink>
          <FooterNavLink href="#skills">{lang === 'es' ? 'Habilidades' : 'Skills'}</FooterNavLink>
          <FooterNavLink href="#experience">{lang === 'es' ? 'Experiencia' : 'Experience'}</FooterNavLink>
          <FooterNavLink href="#education">{lang === 'es' ? 'Educacion' : 'Education'}</FooterNavLink>
        </FooterNav>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.linkedin} target="_blank">
            <LinkedInIcon />
          </SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>
          &copy; 2026 Sebastian Velasquez.{' '}
          {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
