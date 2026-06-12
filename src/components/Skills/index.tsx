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
  gap: 30px;
  justify-content: center;
`;

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854ce6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 4px 0 8px 0;
  user-select: none;
  &:hover {
    opacity: 0.85;
  }
`;

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const ChevronIcon = styled.div<{ $open: boolean }>`
  transition: transform 0.35s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
`;

const CollapseWrapper = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '900px' : '0')};
  overflow: hidden;
  transition: max-height 0.45s ease-in-out;
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 20px;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + '80'};
  border: 1px solid ${({ theme }) => theme.text_primary + '80'};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
`;

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
            ? 'Aquí habilidades que he poseído a lo largo de mi carrera profesional'
            : 'Here are skills I have acquired throughout my professional career'}
        </Desc>
        <SkillsContainer>
          {skills.map((skill, i) => (
            <Skill key={i}>
              <SkillHeader onClick={() => toggleCategory(i)}>
                <SkillTitle>{skill.title}</SkillTitle>
                <ChevronIcon $open={openCategories.has(i)}>
                  <ExpandMore fontSize="large" />
                </ChevronIcon>
              </SkillHeader>
              <CollapseWrapper $open={openCategories.has(i)}>
                <SkillList>
                  {skill.skills.map((item, j) => (
                    <SkillItem key={j}>
                      <SkillImage src={item.image} alt={item.name} />
                      {item.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </CollapseWrapper>
            </Skill>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
