import { useState, useEffect } from "react";

export function GetActiveCollabData() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const fetchProjects = async () => {
    const projectsRes = await fetch("http://localhost:3001/projects");
    const projects = await projectsRes.json();
    return projects;
  };

  const fetchUsers = async () => {
    const usersRes = await fetch("http://localhost:3001/users");
    const users = await usersRes.json();
    return users;
  }

  const getTotalTasks = (projects) => {
    let total = 0;

    projects.forEach(project => {
      total += project.tasks.completed_tasks_count;
    });

    return total;
  };

  const getTotalTime = (projects) => {
    let total = 0;

    projects.forEach(project => {
      const times = project.time.time_records;

      times.forEach(time => {
        total += time.value;
      })
    })

    return total;
  }

  useEffect(() => {
    const load = async () => {
      const projects = await fetchProjects();
      const users = await fetchUsers();
      console.log(projects);
      const totalTasks = getTotalTasks(projects);
      setTotalTasks(totalTasks);
      const totalTime = getTotalTime(projects);
      setTotalTime(totalTime);
    };

    load();
  }, []);

  return { totalTasks, totalTime };
}

export default GetActiveCollabData;