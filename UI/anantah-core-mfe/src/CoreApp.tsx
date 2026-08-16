import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "./content";
import "./base.css";
import "./landing.css";

export default function CoreApp() {
  const { actions, brand, closing, footer, landing, projects, projectsSection } = siteConfig;

  return (
    <main className="landing">
      <section className="landing-hero" style={{ backgroundImage: `url("${landing.heroImage}")` }}>
        <img className="landing-hero__image-description" src={landing.heroImage} alt={landing.heroImageAlt} />
        <div className="landing-hero__shade" />
        <div className="landing-hero__content">
          <span className="landing-hero__domain">{brand.domain}</span>
          <span className="landing-hero__eyebrow">{landing.eyebrow}</span>
          <h1>{landing.title}</h1>
          <p className="landing-hero__statement">{landing.statement}</p>
          <p className="landing-hero__description">{landing.description}</p>
          <Link className="landing-hero__action" to="/auth/signup">
            {landing.primaryAction} <ArrowUpRight size={18} />
          </Link>
        </div>
        <a className="landing-hero__scroll" href="#projects" aria-label="Explore Anantah projects">
          <ArrowDown size={18} />
        </a>
      </section>

      <section className="projects" id="projects">
        <header className="projects__header">
          <div>
            <span className="section-index">{projectsSection.index}</span>
            <h2>{projectsSection.title}</h2>
          </div>
          <p>{projectsSection.description}</p>
        </header>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card--${project.accent}`} key={project.name}>
              <div className="project-card__media">
                <img src={project.image} alt={project.imageAlt} />
                <span>0{index + 1}</span>
              </div>
              <div className="project-card__body">
                <span className="project-card__category">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <Link className="project-card__action" to={project.path} aria-label={`${actions.project}: ${project.name}`}>
                  {actions.project} <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <p>{closing.statement}</p>
        <Link to="/auth/signup">{actions.closing} <ArrowUpRight size={18} /></Link>
      </section>

      <footer className="landing-footer">
        <strong>{brand.name}</strong>
        <span>{footer.statement}</span>
        <span>{footer.copyright}</span>
      </footer>
    </main>
  );
}