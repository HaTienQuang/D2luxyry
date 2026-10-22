import React from "react";
import ProjectsArchive from "@/components/ProjectsArchive";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự án của D2 Luxury Design - Thiết kế & Thi công nội thất cao cấp",
  description: "Khám phá các công trình thiết kế và thi công biệt thự, dinh thự, penthouse cao cấp được thực hiện bởi D2 Luxury Design.",
};

export default function ProjectsPage() {
  return <ProjectsArchive />;
}

