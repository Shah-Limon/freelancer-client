import BreadcumArea from '../../Shared/BreadcumArea';
import useServices from '../../hooks/useServices';
import Service from './Service';
import './Services.css';

const SeoServices = () => {
    const [services] = useServices();

    return (
        <>

          

            <div className='services container'>
                {
                    services.map(service => <>
                        {service.catagory === 'SEO' && <>
                            {service.publishStatus === 'Published' && <Service
                                key={service._id}
                                service={service}
                            ></Service>}
                        </>}
                    </>)
                }
            </div>
        </>
    );
};

export default SeoServices;