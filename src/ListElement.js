import React, { useState } from 'react';
import classNames from 'classnames';

export default function ListElement({name, onSelect}) {
    const [active, setActive] = useState(false);

    const onMouseEnter = () => {
        setActive(true);
    };

    const onMouseLeave = () => {
        setActive(false);
    };

    return (
    <li key={name} 
        className={classNames({"active": active})}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={e => onSelect(name)}
    >
        {name}
    </li>
    );
}