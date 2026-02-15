import { NavLink } from 'react-router-dom';

const links = [
  { to: '/knowledge-hub', label: 'Overview' },
  { to: '/knowledge/mysql', label: 'MySQL' },
  { to: '/knowledge/postgresql', label: 'PostgreSQL' },
  { to: '/knowledge/mongodb', label: 'MongoDB' },
  { to: '/knowledge/scenarios', label: 'When / Why / Why Not' }
];

export default function KnowledgeNav() {
  return (
    <nav className="knowledge-nav">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className="knowledge-nav-link">
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
