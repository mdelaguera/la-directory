"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import projectsData from "@/data/projects.json"
import { StartProjectOverlay } from "@/components/start-project-overlay"

const categories = Array.from(new Set(projectsData.map((project) => project.category)))

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isStartProjectOpen, setIsStartProjectOpen] = useState(false)

  const filteredProjects =
    selectedCategory === "All" ? projectsData : projectsData.filter((project) => project.category === selectedCategory)

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl tracking-tight">Support Our Community</h1>
        <p className="text-xl text-muted-foreground">
          Discover and fund amazing projects that make a difference in our global community.
        </p>
        <Button size="lg" className="mt-4" onClick={() => setIsStartProjectOpen(true)}>
          Start Your Campaign
        </Button>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <StartProjectOverlay isOpen={isStartProjectOpen} onClose={() => setIsStartProjectOpen(false)} />
    </div>
  )
}
