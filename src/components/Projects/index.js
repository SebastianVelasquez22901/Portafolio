import React, { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'

const Projects = ({ openModal, setOpenModal, constants }) => {
  const [toggle, setToggle] = useState('all');
  const { projects, lang } = constants;

  return (
    <Container id="projects">
      <Wrapper>
        <Title>{lang === "es" ? "Proyectos" : "Projects"}</Title>
        <Desc>
          {lang === "es"
            ? "Si te gusta el tema del espacio exterior te invito a que visites el siguiente enlace"
            : "If you like the topic of outer space, I invite you to visit the following link"}
        </Desc>
        <ToggleButtonGroup>
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>
              {lang === "es" ? "Todos" : "All"}
            </ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>
              {lang === "es" ? "Todos" : "All"}
            </ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>
              {lang === "es" ? "Aplicaciones Web" : "Web Apps"}
            </ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>
              {lang === "es" ? "Aplicaciones Web" : "Web Apps"}
            </ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project, i) => (
              <ProjectCard key={i} project={project} openModal={openModal} setOpenModal={setOpenModal} />
            ))}
          {projects
            .filter((item) => item.category === toggle)
            .map((project, i) => (
              <ProjectCard key={i} project={project} openModal={openModal} setOpenModal={setOpenModal} />
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects