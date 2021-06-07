import React, { useState } from 'react';
import firebase from '../../firebase/firebase.utils';
import { useSelector } from "react-redux";
import { generatePushId } from '../../helpers/index';
import { useProjectsValue } from '../../context';
import './add-project.styles.scss';

export const AddProject = ({ shouldShow = false }) => {
    const [show, setShow] = useState(shouldShow);
    const [projectName, setProjectName] = useState('');
    const uId = useSelector(state => state.user.currentUser.id);
    const projectId = generatePushId();
    const { projects, setProjects } = useProjectsValue();

    const addProject = () =>
        projectName &&
        firebase
            .firestore()
            .collection('projects')
            .add({
                projectId,
                name: projectName,
                userId: uId,
            })
            .then(() => {
                setProjects([...projects]);
                setProjectName('');
                setShow(false);
            });

    return (
        <div className="add-project">
            {show && (
                <div className="add-project__input">
                    <input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="add-project__name"
                        type="text"
                        placeholder="Name your project"
                    />
                    <button
                        className="add-project__submit"
                        type="button"
                        onClick={() => addProject()}
                    >
                        Add Project
                    </button>
                    <span
                        aria-label="Cancel adding project"
                        className="add-project__cancel"
                        onClick={() => setShow(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setShow(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
            Cancel
          </span>
                </div>
            )}
            <span className="add-project__plus">+</span>
            <span
                aria-label="Add Project"
                className="add-project__text"
                onClick={() => setShow(!show)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') setShow(!show);
                }}
                role="button"
                tabIndex={0}
            >
        Add Project
      </span>
        </div>
    );
};
