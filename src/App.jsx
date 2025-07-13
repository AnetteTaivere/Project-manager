import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
  });

  function handleSelectProject(id) {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProject: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProject: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProject: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    setProjectsState((prev) => {
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prev,
        selectedProject: undefined,
        projects: [...prev.projects, newProject],
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = <SelectedProject project={selectedProject}/>;

  if (projectsState.selectedProject === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
