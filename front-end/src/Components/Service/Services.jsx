import React, { useContext, useEffect } from 'react';
import ServiceContext from '../../Context/Service/serviceContext';

const Services = () => {
    const serviceContext = useContext(ServiceContext);
    const { services, getAllservice } = serviceContext;
    useEffect(() => {
        getAllservice();
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div className="main-section">
                <section className="container">
                    <div className="pt-5">
                        <h3>Show Service</h3>
                        <hr />
                        <table className='table table-bordered table-responsive'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Date of Join</th>
                                    <th>Title</th>
                                    <th>Department</th>
                                    <th>Service Type</th>
                                    <th>Current Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(services.length === 0) ? <>
                                    <tr><td colSpan={8}><div className="alert alert-warning p-1 mb-0">Sorry, no Data to display!</div></td></tr>
                                </> :
                                    services.map((emp) => {
                                        return (
                                            <>
                                                <tr key={emp._id} >
                                                    <td>{emp.first_name}</td>
                                                    <td>{emp.last_name}</td>
                                                    <td>{emp.age}</td>
                                                    <td>{emp.date_of_join}</td>
                                                    <td>{emp.title}</td>
                                                    <td>{emp.department}</td>
                                                    <td>{emp.service_type}</td>
                                                    <td>{emp.current_status}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Services