import React, { useEffect } from 'react';
import { Checkbox } from '../checkbox/checkbox.component';
import { AddTask } from '../add-task/add-task.component';
import { useTasks } from '../../custom-hooks/index';
import { collatedTasks } from '../../constans/index';
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers/index";
import { useSelectedProjectValue, useProjectsValue } from '../../context/index';

import './tasks.styles.scss';

export const Tasks = () => {
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    const { tasks } = useTasks(selectedProject)


    let projectName = '';

    if (collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    }

    if (
        projects &&
        projects.length > 0 &&
        selectedProject &&
        !collatedTasksExist(selectedProject)
    ) {
        projectName = getTitle(projects, selectedProject).name;
    }

    useEffect(() => {
        document.title = `${projectName}: Todoist`;
    });

    return (
        <div className="tasks">
            <h2>{projectName}</h2>

            <ul className="tasks__list">
                {tasks.map((task) => (
                    <li key={`${task.id}`}>
                        <Checkbox id={task.id} taskDesc={task.task} />
                        <span>{task.task}</span>
                    </li>
                ))}
            </ul>

            <AddTask />
        </div>
    );
};
