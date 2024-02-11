import './charSearchForm.scss';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';



const CharSearchForm = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onComicLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onComicLoaded);
    }
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

    const resultsSearch = (char) => {
        if (!char) {
            return null
        } else {
            if (char.length > 0) {
                return (
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name}</div>
                        <Link to={`/character/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div>
                )
            } else { return (<div className="char__search-error">The character was not found. Check the name and try again</div>)}        
        }
    }

    const results = resultsSearch(char);


    return (
        <div className="char__search-form">
            <Formik 
                initialValues={{charName: ''}}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({charName}) => updateChar(charName)}>
                <Form className='char__search'>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                    <Field 
                        id='name'
                        name='charName'
                        type='text'
                        placeholder='Enter name'/>
                    <button 
                        type='submit' 
                        className="button button__main"
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                    </div>
                    <FormikErrorMessage className='char__search-error' name='charName' component='div'/>
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;