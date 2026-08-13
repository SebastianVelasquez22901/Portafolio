/**
 * Mapea el `name` de cada skill (tal cual aparece en constants.es.ts / constants.en.ts)
 * al slug de simple-icons correspondiente, verificado contra la versión que usa
 * react-icon-cloud (simple-icons@14.0.0 via jsdelivr).
 *
 * Los nombres que no aparecen aquí (Sql Server, FTP) no tienen icono en simple-icons;
 * Skills/index.tsx los renderiza como iconos "custom" reutilizando su `image` original.
 */
export const skillIconSlugs: Record<string, string> = {
  'React Js': 'react',
  'Next Js': 'nextdotjs',
  HTML: 'html5',
  CSS: 'css',
  JavaScript: 'javascript',
  Bootstrap: 'bootstrap',
  Blazor: 'blazor',
  'Vue Js': 'vuedotjs',
  'Node Js': 'nodedotjs',
  NestJS: 'nestjs',
  Python: 'python',
  MySQL: 'mysql',
  Postgresql: 'postgresql',
  FastAPI: 'fastapi',
  'Spring Boot': 'springboot',
  Git: 'git',
  GitHub: 'github',
  Docker: 'docker',
  Namecheap: 'namecheap',
  'Claude Code': 'claude',
  Postman: 'postman',
  Odoo: 'odoo',
};
