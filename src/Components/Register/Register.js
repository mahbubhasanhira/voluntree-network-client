import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import TreeLogo from "../../volunteer-network-resources/logos/Group 1329.png";
import { useForm } from "react-hook-form";
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { UserContext } from '../../App';

const Register = () => {
    const [loggedInUser, setLoggedInUser, selectedTask, setSelectedTask] = useContext(UserContext);
    const [date, setDate] = useState(new Date())
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        const volunteerData = {
            personalData:{...loggedInUser},
            task:{...selectedTask},
            registerData:{...data, date}
        }
        console.log(volunteerData)
    };

    return (
        <>
            { 
                selectedTask._id ? 
                <div className='register_container'>
                    <div className='container col-sm-6 col-md-6 col-lg-6 '>          
                        <div className=' col-md-8 col-lg-5 logo_container'>
                            <Link to='/'><img className='tree_img_logo' src={TreeLogo} alt=""/></Link>
                        </div>
                        <div className='registerFormContainer'>
                            <h2>Register as a Volunteer</h2>
                            <form className='register_form' onSubmit={handleSubmit(onSubmit)}>
                                <input type='text' name="name" defaultValue={loggedInUser && loggedInUser.name} placeholder='Full Name'  ref={register({ required: true })} /><br/>
                                <input type='email' name="email" defaultValue={loggedInUser && loggedInUser.email}  placeholder='Username or Email' ref={register({ required: true })} /><br/>
                                <DatePicker date={date} value={date} onDateChange={setDate} locale={enGB}>
                                {({ inputProps, focused }) => (
                                    <input
                                    className={'input' + (focused ? ' -focused' : '')}
                                    {...inputProps}
                                    />
                                )}
                                </DatePicker>
                                <input type='text' name="description" placeholder='Description'  ref={register({ required: true })} /><br/>
                                <input type='text' name="task" defaultValue={selectedTask && selectedTask.title} placeholder='Task'  ref={register({ required: true })} /><br/>
                                <input value='Registration' className='submit_btn btn btn-primary' type="submit"/>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <div className="container">
                    <h1>Please Select a Task</h1>
                </div>
            }
        </>
    );
};

export default Register;