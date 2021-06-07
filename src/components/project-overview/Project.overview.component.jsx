import React from 'react';
import PropTypes from 'prop-types';
import { useProjectsValue } from '../../context/index';
import './project-overview.styles.scss';

export const ProjectOverlay = ({
                                   setProject,
                                   showProjectOverlay,
                                   setShowProjectOverlay,
                               }) => {
    const { projects } = useProjectsValue();

    return (
        projects &&
        showProjectOverlay && (
            <div className="project-overlay">
                <ul className="project-overlay__list">
                    {projects.map((project) => (
                        <li key={project.projectId}>
                            <div
                                onClick={() => {
                                    setProject(project.projectId);
                                    setShowProjectOverlay(false);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setProject(project.projectId);
                                        setShowProjectOverlay(false);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label="Select the task project"
                            >
                                {project.name}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
};

ProjectOverlay.propTypes = {
    projects: PropTypes.array,
};