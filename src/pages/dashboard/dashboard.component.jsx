import React from "react";
import { TextBlocks } from "../../components/text-blocks/text-blocks.component";
import { ProjectsProvider, SelectedProjectProvider } from '../../context';

export const Dashboard = () => {

    return (
        <SelectedProjectProvider>
            <ProjectsProvider>
                    <TextBlocks />
            </ProjectsProvider>
        </SelectedProjectProvider>
    );
};
