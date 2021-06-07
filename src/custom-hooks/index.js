import { useState, useEffect } from 'react';
import moment from 'moment';
import firebase from '../firebase/firebase.utils';
import { collatedTasksExist } from '../helpers';
import { useSelector } from "react-redux";

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    const currentUserId = useSelector(state => state.user.currentUser.id);

        console.log(`${currentUserId}`);
    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', `${currentUserId}`);

        unsubscribe =
            selectedProject && !collatedTasksExist(selectedProject)
                ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
                : selectedProject === 'TODAY'
                ? (unsubscribe = unsubscribe.where(
                    'date',
                    '==',
                    moment().format('DD/MM/YYYY')
                ))
                : selectedProject === 'INBOX' || selectedProject === 0
                    ? (unsubscribe = unsubscribe.where('date', '==', ''))
                    : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                    task =>
                        moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                        task.archived !== true
                    )
                    : newTasks.filter(task => task.archived !== true)
            );
            setArchivedTasks(newTasks.filter(task => task.archived !== false));
        });

        return () => unsubscribe();
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const currentUserId = useSelector(state => state.user.currentUser.id);

    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            .where('userId', '==', `${currentUserId}`)
            .orderBy('projectId')
            .get()
            .then(snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId: project.id,
                }));

                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects);
                }
            });
    }, [projects]);

    return { projects, setProjects };
};