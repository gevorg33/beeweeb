import React from 'react';
import {Sidebar} from "../sidebar/sidebar.component";
import {Tasks} from "../tasks/Tasks.component";
import './text-blocks.styles.scss';

export const TextBlocks = () => (
    <section className="content">
        <Sidebar />
        <Tasks />
    </section>
);