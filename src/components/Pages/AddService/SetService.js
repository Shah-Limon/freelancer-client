import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './SetService.css';
import useFreelancer from '../../hooks/useFreelancer';
import useClient from '../../hooks/useClient';
import BreadcumArea from '../../Shared/BreadcumArea';

const SetService = () => {
    const [myDatas] = useFreelancer();
    const [clients] = useClient();
    const [categoris, setCategoris] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/categoris`
        fetch(url)
            .then(res => res.json())
            .then(data => setCategoris(data));

    }, []);
    return (
      <>
    
      <div>
            {clients.length === 0 &&
                <>
                    {
                        myDatas.filter(data => data.status === "Approved").length === 1 &&
                        <div className='container'>
                            <h5>Choose a Category</h5>
                            <div className='categoris'>
                                
                                {
                                    categoris.map(category =>
                                        <div className='shadow p-3 mb-5 mx-5 bg-body rounded-5'>
                                            <h5><Link className='btn' to={`/createservice/${category.slug}`}>{category.categoryName}</Link></h5>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    }
                    {
                        myDatas.filter(data => data.status === "Unapproved").length === 1 &&
                        <div className='container balance py-5 shadow p-3 mb-5 rounded-5'><h3>Sorry! Your Account is Not Approved. You can touch us at: </h3>
                        </div>
                    }

                    {myDatas.length === 0 &&
                        <div> <Button><Link className='text-white' to={'/update'}>Please Update Your Provider Account</Link></Button></div>
                    }
                </>
            }

            {clients.length === 1 &&
                <Button>Sorry. Client can not add any service..</Button>
            }


        </div>
      </>
    );
};

export default SetService;