import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectDetailView from "@/components/ProjectDetailView";
import { allArchiveProjects } from "@/data/allProjects";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allArchiveProjects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = allArchiveProjects.find(
    (p) => p.slug === params.slug || p.id === params.slug
  );

  if (!project) {
    return {
      title: "Dự án không tồn tại - D2 Luxury Design",
    };
  }

  return {
    title: `${project.title} - D2 Luxury Design Thiết kế & Thi công`,
    description: project.description,
  };
}

export default function SingleProjectPage({ params }: PageProps) {
  const project = allArchiveProjects.find(
    (p) => p.slug === params.slug || p.id === params.slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}

