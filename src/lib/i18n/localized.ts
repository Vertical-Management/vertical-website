import type { Project, Service, ProcessStep } from "@/types";
import { projects } from "@/data/projects";
import { services, processSteps } from "@/data/services";
import type { Dictionary } from "./types";

type ServiceId = keyof Dictionary["serviceItems"];
type ProjectSlug = keyof Dictionary["projectItems"];

/** Merge static service catalogue with locale copy. */
export function localizeServices(t: Dictionary): Service[] {
  return services.map((s) => {
    const copy = t.serviceItems[s.id as ServiceId];
    if (!copy) return s;
    return {
      ...s,
      title: copy.title,
      punch: copy.punch,
      description: copy.description,
      longDescription: copy.longDescription,
      tags: copy.tags,
      deliverables: copy.deliverables,
    };
  });
}

export function localizeProcessSteps(t: Dictionary): ProcessStep[] {
  return processSteps.map((step, i) => {
    const copy = t.processSteps[i];
    if (!copy) return step;
    return {
      ...step,
      title: copy.title,
      description: copy.description,
    };
  });
}

export function localizeProject(project: Project, t: Dictionary): Project {
  const copy = t.projectItems[project.slug as ProjectSlug];
  if (!copy) return project;
  return {
    ...project,
    subtitle: copy.subtitle,
    projectType: copy.projectType,
    role: copy.role,
    categories: copy.categories,
    excerpt: copy.excerpt,
    description: copy.description,
    caseStudy: copy.caseStudy,
  };
}

export function localizeProjects(t: Dictionary): Project[] {
  return projects.map((p) => localizeProject(p, t));
}

export function localizeFeaturedProjects(t: Dictionary): Project[] {
  return localizeProjects(t).filter((p) => p.featured);
}
