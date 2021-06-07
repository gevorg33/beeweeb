import React from 'react';
import firebase from '../../firebase/firebase.utils'
import './checkbox.styles.scss';

export const Checkbox = ({ id, taskDesc }) => {
    const archiveTask = () => {
        firebase.firestore().collection('tasks').doc(id).update({
            archived: true,
        });
    };

    return (
        <div
            className="checkbox-holder"
            onClick={() => archiveTask()}
            onKeyDown={(e) => {
                if (e.key === 'Enter') archiveTask();
            }}
            aria-label={`Mark ${taskDesc} as done?`}
            role="button"
            tabIndex={0}
        >
            <span className="checkbox" />
        </div>
    );
};