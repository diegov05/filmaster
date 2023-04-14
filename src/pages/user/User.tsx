import { User } from 'firebase/auth';
import React from 'react';

export interface IUserProps {
    user: User
}

const User: React.FC<IUserProps> = (props) => {

    const user = props.user

    return (
        <div>
            {user.displayName}
        </div>
    );
}

export { User };