import { ChangeEvent, FormEvent, useState } from "react";
import { useAddGameMutation } from "./queries/useAddGameMutation";


export const AddGame = () => {
    const { mutate, isPending } = useAddGameMutation();
   

    // Stan komponentu
    const [values, setValues] = useState({
        matchdate: '',
        title: '',
        place: '',
        duration: '',
        idTeam1: '',
        idTeam2: '',
        goalsTeam1: '',
        goalsTeam2: ''
    });

    // Obsługa zmiany w polach formularza
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    // Obsługa wysyłania formularza
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Walidacja
        // if (!values.title.trim() || !values.matchdate.trim() || !values.idTeam1 || !values.idTeam2) {
        //     alert(`All fields are required!`);
        //     return;
        // }

        // Wywołanie mutacji
        mutate({
            title: values.title,
            matchdate: values.matchdate,
            place: values.place,
            duration: values.duration,
            idTeam1: values.idTeam1,
            idTeam2: values.idTeam2,
            goalsTeam1: parseInt(values.goalsTeam1) || 0,
            goalsTeam2: parseInt(values.goalsTeam2) || 0,
        });

        // Resetowanie stanu
        setValues({
            title: '',
            matchdate: '',
            place: '',
            duration: '',
            idTeam1: '',
            idTeam2: '',
            goalsTeam1: '',
            goalsTeam2: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={values.title} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="matchdate">Match Date</label>
                <input 
                    type="date" 
                    name="matchdate" 
                    id="matchdate" 
                    value={values.matchdate} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="place">Place</label>
                <input 
                    type="text" 
                    name="place" 
                    id="place" 
                    value={values.place} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="duration">Duration</label>
                <input 
                    type="text" 
                    name="duration" 
                    id="duration" 
                    value={values.duration} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="idTeam1">Team 1</label>
                <input 
                    type="text" 
                    name="idTeam1" 
                    id="idTeam1" 
                    value={values.idTeam1} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="idTeam2">Team 2</label>
                <input 
                    type="text" 
                    name="idTeam2" 
                    id="idTeam2" 
                    value={values.idTeam2} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="goalsTeam1">Goals Team 1</label>
                <input 
                    type="number" 
                    name="goalsTeam1" 
                    id="goalsTeam1" 
                    value={values.goalsTeam1} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="goalsTeam2">Goals Team 2</label>
                <input 
                    type="number" 
                    name="goalsTeam2" 
                    id="goalsTeam2" 
                    value={values.goalsTeam2} 
                    onChange={handleChange} 
                />
            </div>
            <button type="submit" disabled={isPending}>
                {isPending ? 'Adding...' : 'Add Game'}
            </button>
        </form>
    );
};