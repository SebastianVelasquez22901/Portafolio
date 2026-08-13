import styled from 'styled-components';
import { usePortfolio } from '../../context/PortfolioContext';
import { skillIconSlugs } from '../../data/skillIconSlugs';
import IconCloud from './IconCloud';

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
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 32px;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SphereCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const SkillTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const Skills = () => {
  const { constants } = usePortfolio();
  const { skills, lang } = constants;

  const sphereSize = 220;

  const buildCloudProps = (categorySkills: { name: string; image: string }[]) => {
    const slugs: string[] = [];
    const customIcons: { name: string; image: string }[] = [];
    categorySkills.forEach((skill) => {
      const slug = skillIconSlugs[skill.name];
      if (slug) {
        slugs.push(slug);
      } else {
        customIcons.push(skill);
      }
    });
    return { slugs, customIcons };
  };

  const [frontend, backend, others] = skills;

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
          <TopRow>
            {[frontend, backend].map((category) => {
              const { slugs, customIcons } = buildCloudProps(category.skills);
              return (
                <SphereCard key={category.title}>
                  <SkillTitle>{category.title}</SkillTitle>
                  <IconCloud
                    slugs={slugs}
                    customIcons={customIcons}
                    sphereSize={sphereSize}
                  />
                </SphereCard>
              );
            })}
          </TopRow>
          <BottomRow>
            {others &&
              (() => {
                const { slugs, customIcons } = buildCloudProps(others.skills);
                return (
                  <SphereCard>
                    <SkillTitle>{others.title}</SkillTitle>
                    <IconCloud
                      slugs={slugs}
                      customIcons={customIcons}
                      sphereSize={sphereSize}
                    />
                  </SphereCard>
                );
              })()}
          </BottomRow>
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
