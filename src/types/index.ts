export interface Bio {
  name: string;
  roles: string[];
  description: string;
  github: string;
  resume: string;
  linkedin: string;
  insta: string;
}

export interface Skill {
  name: string;
  image: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  id: number;
  img: string;
  role: string;
  company: string;
  date: string;
  desc: string;
  skills: string[];
  doc?: string;
}

export interface Education {
  id: number;
  img: string;
  school: string;
  date: string;
  grade: string;
  desc: string;
  degree: string;
}

export interface ProjectMember {
  name: string;
  img: string;
  linkedin: string;
  github: string;
}

export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github: string;
  webapp: string;
  member?: ProjectMember[];
}

export interface Course {
  name: string;
  image: string;
  link: string;
}

export interface Constants {
  Bio: Bio;
  skills: SkillCategory[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  courses: Course[];
  lang: 'es' | 'en';
}

export interface ModalState {
  state: boolean;
  project: Project | null;
}
