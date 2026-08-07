import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/proyectos/ProjectDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";
import { asset } from "@/lib/assets";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Proyecto" };
  }
  const cover = asset(project.cover);
  return {
    title: project.title,
    description: project.excerpt,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.title} · Vertical`,
      description: project.excerpt,
      url: `/proyectos/${project.slug}`,
      images: [
        {
          url: cover,
          alt: project.title,
        },
        {
          url: "/og.svg",
          width: 1200,
          height: 630,
          alt: "Vertical Management",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [cover, "/og.svg"],
    },
  };
}

export default function ProyectoSlugPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const ld = projectJsonLd(project.slug);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Proyectos", path: "/proyectos" },
    { name: project.title, path: `/proyectos/${project.slug}` },
  ]);

  return (
    <>
      {ld ? <JsonLd data={[ld, crumbs]} /> : <JsonLd data={crumbs} />}
      <ProjectDetail project={project} />
    </>
  );
}
