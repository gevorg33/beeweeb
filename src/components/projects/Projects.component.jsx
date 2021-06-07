import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelectedProjectValue } from '../../context/index';
import { IndividualProject } from "../individua-projects/Individual-projects.component";
import './projects.styles.scss';
import {useDispatch,useSelector} from "react-redux";
import {fetchTasksStart} from "../../redux/tasks/tasks.actions";


export const Projects = ({ activeValue = null }) => {
    const [active, setActive] = useState(activeValue);
    const { setSelectedProject } = useSelectedProjectValue();
    const projects = useSelector(state => state.tasks.tasks ? state.tasks.tasks : []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksStart());
    },[]);


    return (
        projects &&
        projects.map((project) => (
            <li
                key={project.projectId}
                data-doc-id={project.docId}
                className={
                    active === project.projectId
                        ? 'active sidebar__project'
                        : 'sidebar__project'
                }
            >
                <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${project.name} as the task project`}
                    onClick={() => {
                        setActive(project.projectId);
                        setSelectedProject(project.projectId);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setActive(project.projectId);
                            setSelectedProject(project.projectId);
                        }
                    }}
                >
                    <IndividualProject project={project} />
                </div>
            </li>
        ))
    );
};

Projects.propTypes = {
    activeValue: PropTypes.bool,
};

