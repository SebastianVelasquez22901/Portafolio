import { useState } from 'react';
import styled from 'styled-components';
import { ExpandMore } from '@mui/icons-material';
import type { Experience } from '../../types';

const Card = styled.div<{ $open: boolean }>`
  width: 650px;
  border-radius: 10px;
  box-shadow: ${({ $open }) =>
    $open
      ? 'rgba(29, 78, 137, 0.15) 0px 4px 24px'
      : '0 0 0 1.5px rgba(29, 78, 137, 0.55), rgba(29, 78, 137, 0.25) 0px 6px 28px'};
  border: ${({ $open }) => ($open ? '0.1px solid #1D4E89' : '1px solid transparent')};
  background: ${({ theme }) => theme.card};
  overflow: hidden;
  transition: box-shadow 0.35s ease, transform 0.35s ease;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
  }
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Header = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: background 0.3s ease;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: linear-gradient(to bottom, #14213D, #1D4E89);
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    transition: opacity 0.35s ease;
  }
  &:hover { opacity: 0.9; }
  @media only screen and (max-width: 768px) { padding: 10px; }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Image = styled.img`
  height: 50px;
  background-color: #000;
  border-radius: 10px;
  margin-top: 4px;
  flex-shrink: 0;
  @media only screen and (max-width: 768px) { height: 40px; }
`;

const ImageFallback = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  margin-top: 4px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #14213D 0%, #1D4E89 100%);
  @media only screen and (max-width: 768px) { height: 40px; width: 40px; }
`;

const HeaderImage = ({ src, alt }: { src: string; alt: string }) => {
  const [errored, setErrored] = useState(false);
  if (errored) return <ImageFallback title={alt} />;
  return <Image src={src} alt={alt} onError={() => setErrored(true)} />;
};

const HeaderBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Role = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + '99'};
  @media only screen and (max-width: 768px) { font-size: 14px; }
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + '99'};
  @media only screen and (max-width: 768px) { font-size: 12px; }
`;

const DateStyled = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + '80'};
  @media only screen and (max-width: 768px) { font-size: 10px; }
`;

const CollapseHint = styled.span<{ $open: boolean }>`
  font-size: 11px;
  font-style: italic;
  color: ${({ theme }) => theme.primary};
  opacity: ${({ $open }) => ($open ? 0 : 0.75)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  margin-right: 6px;
`;

const ChevronIcon = styled.div<{ $open: boolean }>`
  transition: transform 0.35s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CollapseWrapper = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.45s ease-in-out;
`;

const CollapsibleBody = styled.div`
  padding: 0 16px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media only screen and (max-width: 768px) { padding: 0 10px 10px 10px; }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + '99'};
  line-height: 1.6;
  @media only screen and (max-width: 768px) { font-size: 12px; }
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const TechLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const TechChip = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + '55'};
  border-radius: 20px;
  padding: 2px 10px;
`;

interface ExperienceCardProps {
  experience: Experience;
  isOpen: boolean;
  onToggle: () => void;
}

const ExperienceCard = ({ experience, isOpen, onToggle }: ExperienceCardProps) => {
  return (
    <Card $open={isOpen}>
      <Header $open={isOpen} onClick={onToggle}>
        <HeaderLeft>
          <HeaderImage src={experience.img} alt={experience.company} />
          <HeaderBody>
            <Role>{experience.role}</Role>
            <Company>{experience.company}</Company>
            <DateStyled>{experience.date}</DateStyled>
          </HeaderBody>
        </HeaderLeft>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CollapseHint $open={isOpen}></CollapseHint>
          <ChevronIcon $open={isOpen}>
            <ExpandMore fontSize="medium" />
          </ChevronIcon>
        </div>
      </Header>
      <CollapseWrapper $open={isOpen}>
        <CollapsibleBody>
          {experience.desc && (
            <Description>{experience.desc}</Description>
          )}
          {experience.skills && experience.skills.length > 0 && (
            <SkillsRow>
              <TechLabel>Tecnologías:</TechLabel>
              {experience.skills.map((skill, i) => (
                <TechChip key={i}>{skill}</TechChip>
              ))}
            </SkillsRow>
          )}
        </CollapsibleBody>
      </CollapseWrapper>
    </Card>
  );
};

export default ExperienceCard;
