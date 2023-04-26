import React from 'react';
import { List, NavBar } from './components';


export interface IUserProps { }

const User: React.FC<IUserProps> = (props) => {
    return (
        <div>
            <NavBar />
            <List />
        </div>
    );
}

export { User };