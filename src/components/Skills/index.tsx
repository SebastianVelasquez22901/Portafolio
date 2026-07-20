import { useState } from 'react';
import styled from 'styled-components';
import { ExpandMore } from '@mui/icons-material';
import { usePortfolio } from '../../context/PortfolioContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 24px;
  justify-content: center;
`;

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(133, 76, 230, 0.25);
  box-shadow: rgba(133, 76, 230, 0.08) 0px 4px 24px;
  border-radius: 20px;
  padding: 20px 28px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    border-color: rgba(133, 76, 230, 0.55);
    box-shadow: rgba(133, 76, 230, 0.18) 0px 8px 32px;
  }
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 14px 20px;
  }
  @media (max-width: 500px) {
    max-width: 340px;
    padding: 12px 16px;
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 2px 0 6px 0;
  user-select: none;
  gap: 12px;
`;

const SkillHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SkillTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const SkillCount = styled.span<{ $open: boolean }>`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: ${({ $open }) => ($open ? 0 : 0.8)};
  max-height: ${({ $open }) => ($open ? '0' : '20px')};
  overflow: hidden;
  transition: opacity 0.25s ease, max-height 0.35s ease;
`;

const ChevronIcon = styled.div<{ $open: boolean }>`
  transition: transform 0.35s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: #854CE6;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Divider = styled.div<{ $open: boolean }>`
  height: 1px;
  background: rgba(133, 76, 230, 0.2);
  margin: 0 0 2px 0;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const CollapseWrapper = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.45s ease-in-out;
`;

const SkillList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 14px;
  padding-bottom: 6px;
`;

const SkillItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card_light || theme.card};
  border: 1px solid ${({ theme }) => theme.text_primary + '22'};
  border-radius: 10px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: default;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: #854CE6;
    box-shadow: 0 0 10px rgba(133, 76, 230, 0.2);
    background: rgba(133, 76, 230, 0.06);
  }
  @media (max-width: 500px) {
    font-size: 13px;
    padding: 7px 11px;
  }
`;

const SkillImage = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex-shrink: 0;
`;

const ImageFallback = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background: linear-gradient(135deg, #854CE6 0%, #13ADC7 100%);
  flex-shrink: 0;
`;

const SkillItemIcon = ({ src, alt }: { src: string; alt: string }) => {
  const [errored, setErrored] = useState(false);
  if (errored) return <ImageFallback title={alt} />;
  return <SkillImage src={src} alt={alt} onError={() => setErrored(true)} />;
};

const Skills = () => {
  const { constants } = usePortfolio();
  const { skills, lang } = constants;

  const [openCategories, setOpenCategories] = useState<Set<number>>(
    () => new Set<number>()
  );

  const toggleCategory = (i: number) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <Container id="skills">
      <Wrapper>
        <Title>{lang === 'es' ? 'Habilidades' : 'Skills'}</Title>
        <Desc>
          {lang === 'es'
            ? 'Tecnologías que he dominado a lo largo de mi carrera'
            : 'Technologies I have mastered throughout my career'}
        </Desc>
        <SkillsContainer>
          {skills.map((skill, i) => {
            const isOpen = openCategories.has(i);
            return (
              <Skill key={i}>
                <SkillHeader onClick={() => toggleCategory(i)}>
                  <SkillHeaderLeft>
                    <SkillTitle>{skill.title}</SkillTitle>
                    <SkillCount $open={isOpen}>
                      {skill.skills.length}{' '}
                      {lang === 'es' ? 'tecnologías' : 'technologies'}
                    </SkillCount>
                  </SkillHeaderLeft>
                  <ChevronIcon $open={isOpen}>
                    <ExpandMore fontSize="medium" />
                  </ChevronIcon>
                </SkillHeader>
                <Divider $open={isOpen} />
                <CollapseWrapper $open={isOpen}>
                  <SkillList>
                    {skill.skills.map((item, j) => (
                      <SkillItem key={j}>
                        <SkillItemIcon src={item.image} alt={item.name} />
                        {item.name}
                      </SkillItem>
                    ))}
                  </SkillList>
                </CollapseWrapper>
              </Skill>
            );
          })}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
