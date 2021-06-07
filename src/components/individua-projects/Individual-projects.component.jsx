import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../../context/index';
import firebase from '../../firebase/firebase.utils';
import './individual-projects.styles.scss';

export const IndividualProject = ({ project }) => {
    const [ showConfirm, setShowConfirm ] = useState(false);
    const { projects, setProjects } = useProjectsValue();
    const { setSelectedProject } = useSelectedProjectValue();

    const deleteProject = (docId) => {
        firebase
            .firestore()
            .collection('projects')
            .doc(docId)
            .delete()
            .then(() => {
                setProjects([...projects]);
                setSelectedProject('INBOX');
            });
    };

    return (
        <>
            <span className="sidebar__dot">•</span>
            <span className="sidebar__project-name">{project.name}</span>
            <span
                className="sidebar__project-delete"
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                role="button"
                aria-label="Confirm"
            >
        <FaTrashAlt />
                {showConfirm && (
                    <div className="project-delete-modal">
                        <div className="project-delete-modal__inner">
                            <button
                                type="button"
                                onClick={() => deleteProject(project.docId)}
                            >
                                X
                            </button>
                            <span
                                onClick={() => setShowConfirm(!showConfirm)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') setShowConfirm(!showConfirm);
                                }}
                                tabIndex={0}
                                role="button"
                                aria-label="Cancel"
                            >
                Cancel
              </span>
                        </div>
                    </div>
                )}
      </span>
        </>
    );
};
