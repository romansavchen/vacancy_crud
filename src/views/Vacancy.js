import React, { useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import {ReactComponent as Trash} from '../icons/trash.svg';
import {ReactComponent as Marker} from '../icons/marker.svg';

export default function Vacancy ({vac, cities, removeVacancy = () => {}}) {
    const [active, setActive] = useState(false);
    const history = useHistory();

    let city = cities.find(x => x.id === vac.city);
    let date = new Date(vac.createdAt)
    let uiDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
    let price = typeof vac.price !== "object" ? vac.price : `${vac.price?.from} - ${vac.price?.to}`;

    const renderBenefits = (benefit) => {
        if (benefit)
        return (
            <span className="benefit">{benefit}</span>
        );

        return null;
    }

    const editVacancy = (e, id) => {
        e.preventDefault();
        if (e.target.nodeName !== "svg") {
            history.push({pathname: `/vacancies`, query: {id: id}})
        } 
    }

    const onMouseEnter = (e) => {
        setActive(true);
    };

    const onMouseLeave = () => {
        setActive(false);
    };

    return (
        <a href=""
            key={vac.id} 
            className="vacancy"
            onClick={(e) => editVacancy(e, vac.id)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Trash className={classNames("icon", "trash", {"active": active })} onClick={e => removeVacancy(vac.id)} />
            <article className="common-info">
                <h4 className="vacancy-title">{vac.name}</h4>
                <span className="location"><Marker className="marker"/> {city?.name}</span>
                <p className="price">{price}</p>
                <div className="benefits">{renderBenefits(vac.priceComment)}</div>
            </article>
            
            <span className="publication-time">{uiDate}</span>
        </a>   
    );
}