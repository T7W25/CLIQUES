import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import EmployeeContext from '../../Context/Service/serviceContext';

const Ticket = () => {
    const employeeContext = useContext(EmployeeContext);
    const { addEmployee } = employeeContext;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const ages = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
    const onSubmit = data => {
        addEmployee(data.first_name, data.last_name, data.age, data.date_of_join, data.title, data.department, data.employee_type);
        reset({ first_name: '', last_name: '', age: '', date_of_join: '', title: '', department: '', employee_type: '' });
        alert('Employee Added Sucessfully.');
    }
    return (
        <div className="main-section">
            <section className="container">
                <div className="pt-5">
                    <h3>Add Ticket</h3>
                    <hr />
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="form" method="post">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-control-label">Your name</label>
                                    <input className="form-control" type="text" placeholder="Enter Your Name" name='name' id='name'
                                        {...register("name", {
                                            required: true,
                                            pattern: /[A-Za-z]+$/
                                        })} />
                                    {errors.name && errors.name.type === "required" && (
                                        <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">This is required field!</span>
                                    )}
                                    {errors.name && errors.name.type === "pattern" && (
                                        <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">Enter valid name!</span>
                                    )}
                                </div>
                            </div> 
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-control-label">Age</label>
                                    <select name="age" className='form-control' id="age" {...register("age", {
                                        required: true
                                    })}>
                                        {(ages.length !== 0) &&
                                            ages.map((age) => {
                                                return (
                                                    <>
                                                        <option value={age}>{age}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                    {errors.age && errors.age.type === "required" && (
                                        <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">This is required field!</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-control-label">Date of Join</label>
                                    <input className="form-control" type="date" name='date_of_join' id='date_of_join' {...register("date_of_join", {
                                        required: true
                                    })} />
                                    {errors.date_of_join && errors.date_of_join.type === "required" && (
                                        <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">This is required field!</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-control-label">Title</label>
                                    <select name="title" className='form-control' id="title" {...register("title", {
                                        required: true
                                    })}>
                                        <option value="Employee">Employee</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Director">Director</option>
                                        <option value="VP">VP</option>
                                    </select>
                                    {errors.title && errors.title.type === "required" && (
                                        <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">This is required field!</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-control-label">Department</label>
                                    <select name="department" className='form-control' id="department" {...register("department", {
                                        required: true
                                    })}>
                                        <option value="IT">IT</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="HR">HR</option>
                                        <option value="Engineering">Engineering</option>
                                    </select>
                                    {errors.department && errors.department.type === "required" && (
                                        <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">This is required field!</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-control-label">Employee Type</label>
                                    <select name="employee_type" className='form-control' id="employee_type" {...register("employee_type", {
                                        required: true
                                    })}>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Seasonal">Seasonal</option>
                                    </select>
                                    {errors.employee_type && errors.employee_type.type === "required" && (
                                        <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">This is required field!</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <button type='submit' name='save' value='save' className='btn btn-warning'>Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Ticket