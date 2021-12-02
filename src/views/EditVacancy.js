import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from 'classnames';
import { useForm } from "react-hook-form";

import { useThrottledCallback } from '../utils';
import ListElement from '../ListElement';
import {Status, Actions} from '../actions/app';

export default function EditVacancy() {
    const { query } = useLocation();
    const [city, setCity] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [select, setIsSelect] = useState(false);
    const dispatch = useDispatch();
    const vacancy = useSelector(state => state.app.vacancies.find(x => x.id === query.id));
    const cities = useSelector(state => state.app.cities);
    const suggest = useSelector(state => state.app.suggest);
    const history = useHistory();
    const { register, handleSubmit, resetField, formState: {errors}, reset } = useForm({defaultValues: vacancy, mode: "onChange"});

    const loadSuggestions = useThrottledCallback(() => {
        dispatch(Actions.Autocomplete({search: city}));
    }, 300, [city]);

    useEffect(() => {
        if(city !== undefined)
        loadSuggestions();
    }, [city]);

    useEffect(() => {
        dispatch(Actions.GetAllVacancies());
        dispatch(Actions.GetAllCities());
    }, []);

    useEffect(() => {
        const vacCity = cities.find(x => x.id === vacancy?.city);
        setCity(vacCity?.name);
        reset({...vacancy, city: vacCity?.name});
    }, [cities]);

    const onChange = (fieldName, value) => {
        if(fieldName === "city") {
            setCity(value);
            setIsOpen(true);
            setIsSelect(false);
        }
    }

    const onSubmit = (data) => {
        if (!select) return;
        var currentCity = cities.find(x => x.name === city);
        if (query?.id) {
             dispatch(Actions.UpdateVacancy(query.id, {vacancy: { ...data, city : currentCity.id}}));
        } else {
             dispatch(Actions.CreateVacancy({vacancy: { ...data, city : currentCity.id, createdAt: Date.now()}}));
        }

        history.push("/");
    }

    const onSelectCity = (city) => {
        setCity(city);
        setIsOpen(false);
        setIsSelect(true);
        resetField("city", {defaultValue: city});
    }
    console.log(suggest)
    return (
        <div className="form-wrapper">
         <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <fieldset>
                    <div className="field" >
                        <label htmlFor="name"><b>Name</b></label>
                        <p className="description">Vacancy name</p>
                        <input type="text" className={classNames({"alert": errors.name})}
                            {...register("name", {
                                required: true,
                                maxLength: 10,
                            })}
                        />
                        {errors.name && errors.name.type === "maxLength" && (
                            <span className="error">Max length exceeded</span>
                        )}
                        {errors.name && errors.name.type === "required" && (
                            <span className="error">This field is required</span>
                        )}
                    </div>
                </fieldset>

                <fieldset>
                    <div className="field">
                        <label htmlFor="price"><b>Price</b></label>
                        <p className="description">Vacancy price</p>
                        <input type="text" className={classNames({"alert": errors.price})}
                            {...register("price", {required: true, pattern: /^\d+$/g, maxLength: 10, minLength: 1})}
                        />
                        {errors.price && errors.price.type === "maxLength" && (
                            <span className="error">Max length exceeded</span>
                        )}
                        {errors.price && errors.price.type === "pattern" && (
                            <span className="error">Only number is supported</span>
                        )}
                        {errors.price && errors.price.type === "required" && (
                            <span className="error">This field is required</span>
                        )}
                    </div>
                </fieldset>

                <fieldset>
                    <div className="field">
                        <label htmlFor="priceComment"><b>Comment price</b></label>
                        <p className="description">Comment price</p>
                        <input type="text" className={classNames({"alert": errors.priceComment})}
                            aria-invalid={errors.priceComment ? "true" : "false"}
                            {...register("priceComment", {maxLength: 20})}
                        />
                        {errors.priceComment && errors.priceComment.type === "maxLength" && (
                            <span className="error">Max length exceeded</span>
                        )}
                    </div>
                </fieldset>

                <fieldset>
                    <div className="field">
                        <label htmlFor="city"><b>City</b></label>
                        <p className="description">Vacancy city</p>
                        <input type="text" className={classNames({"alert": errors.city})}
                            aria-invalid={errors.city ? "true" : "false"}
                            {...register("city", {required: true, onChange: e => onChange("city", e.target.value)})}
                        />
                        {errors.city && errors.city.type === "required" && (
                            <span className="error">This field is required</span>
                        )}
                        {suggest.length > 0 && <ul className={classNames("suggest", {"active": isOpen})}>
                            {suggest.map(x => {
                                return  (
                                    <ListElement key={x.name} name={x.name} onSelect={onSelectCity} />
                                );
                            })}
                        </ul>}
                    </div>
                </fieldset>
                    <button className="right positive button">Save</button>
            </form>
        </div>
    );
}