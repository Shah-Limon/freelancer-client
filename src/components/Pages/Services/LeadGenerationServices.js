import BreadcumArea from '../../Shared/BreadcumArea';
import useServices from '../../hooks/useServices';
import Service from './Service';
import './Services.css';

const LeadGenerationServices = () => {
    const [services] = useServices();

    return (
       <>


       <div className='services container'>
            {
                services.map(service => <>
                    {service.publishStatus === 'Published' && <>
                    {service.catagory === 'Lead'  && <Service
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

export default LeadGenerationServices;