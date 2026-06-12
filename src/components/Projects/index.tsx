import { useState } from 'react';
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from './ProjectsStyle';
import ProjectCard from '../Cards/ProjectCards';
import { usePortfolio } from '../../context/PortfolioContext';

const Projects = () => {
  const [toggle, setToggle] = useState('all');
  const { constants } = usePortfolio();
  const { projects, lang } = constants;

  return (
    <Container id="projects">
      <Wrapper>
        <Title>{lang === 'es' ? 'Proyectos' : 'Projects'}</Title>
        <Desc>
          {lang === 'es'
            ? 'Si te gusta el tema del espacio exterior te invito a que visites el siguiente enlace'
            : 'If you like the topic of outer space, I invite you to visit the following link'}
        </Desc>
        <ToggleButtonGroup>
          <ToggleButton $active={toggle === 'all'} onClick={() => setToggle('all')}>
            {lang === 'es' ? 'Todos' : 'All'}
          </ToggleButton>
          <Divider />
          <ToggleButton $active={toggle === 'web app'} onClick={() => setToggle('web app')}>
            {lang === 'es' ? 'Aplicaciones Web' : 'Web Apps'}
          </ToggleButton>
        </ToggleButtonGroup>
        <CardContainer>
          {(toggle === 'all' ? projects : projects.filter((p) => p.category === toggle)).map(
            (project) => (
              <ProjectCard key={project.id} project={project} />
            ),
          )}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
