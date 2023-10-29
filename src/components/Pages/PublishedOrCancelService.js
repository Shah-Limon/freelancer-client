import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link, useParams } from 'react-router-dom';
import useServices from '../hooks/useServices';

const PublishedOrCancelService = () => {
    const [services] = useServices();
 

    return (
        <div>
          
                    <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Service Name</th>
                    
                </tr>
            </thead>
            <tbody>
            {
                services.map(service =>

                    
                <tr>
                    <td><img className='service-img' src={service.img} alt="" /></td>
                    <td><Link to={`/service/${service._id}`}>{service.title}</Link>
                    {service.publishStatus === 'pending' && <div>
                        <Link to={`/confirmpublish/${service._id}`}>Publish or Cancel</Link>
                    </div>}
                    </td>              
                </tr>).reverse()}

            </tbody>
        </Table>    
        </div>
    );
};

export default PublishedOrCancelService;