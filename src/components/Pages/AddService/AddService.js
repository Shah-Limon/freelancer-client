import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './AddService.css';
import { useForm } from "react-hook-form";
import useFreelancer from '../../hooks/useFreelancer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useClient from '../../hooks/useClient';
import { useState } from 'react';
import { useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const AddService = () => {

  const [user] = useAuthState(auth);
  const { register, handleSubmit } = useForm();
  const [myDatas] = useFreelancer();
  const [categories, setCategories] = useState([]);
  const [clients] = useClient();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState('');



  useEffect(() => {
    const url = `http://localhost:5000/categoris`
    fetch(url)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const onSubmit = data => {
    const url = `http://localhost:5000/service/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        navigate('/dashboard');
      })
  }
  return (
    <>

      {/* <div className='container'>
            
            {myDatas.length === 1 &&
                <div>
                    <form className='add-service' onSubmit={handleSubmit(onSubmit)}>
                        <input value={user.email} type="hidden" {...register("email")} />
                        <input value='Pending' hidden {...register("publishStatus")} />
                        {
                            myDatas.map(myData => <><input value={myData.name} hidden {...register("providerName")} /></>)
                        }
                        {
                            myDatas.map(myData => <><input value={myData._id} hidden {...register("providerId")} /></>)
                        }
                        {
                            myDatas.map(myData => <><input value={myData.profile} hidden {...register("profileIMG")} /></>)
                        }
                        <select name="catagory" required>
                            {
                                categories.map(category => <option value="seo">{category.categoryName}</option>
                                )
                            }
                            
                            
                        </select>
                        <input required {...register("title")} placeholder='Your Service Title' />
                        <input required type="number" {...register("price")} placeholder='Monthly Charge' />
                        <input required {...register("img")} placeholder='Image URL' />
                        <textarea required {...register("details")} />
                        <input className='btn btn-primary' type="submit" />
                    </form>
                </div>
            }


            {myDatas.length === 0 &&
                <div>
                    <Button><Link className='text-white' to={'/update'}>Please Update Your Provider Account</Link></Button>
                </div>
            }

            {
                clients.length === 1 && 
                <div>
                    <Button>Sorry. Buyer can not add any service.</Button>
                </div>
            }

        </div > */}
      <div className='container'>

        {myDatas.length === 1 && (
          <div>
            <form className='add-service' onSubmit={handleSubmit(onSubmit)}>
              <input value={user.email} type="hidden" {...register("email")} />
              <input value='Pending' hidden {...register("publishStatus")} />

              {myDatas.map(myData => (
                <React.Fragment key={myData._id}>
                  <input value={myData.name} hidden {...register("providerName")} />
                  <input value={myData._id} hidden {...register("providerId")} />
                  <input value={myData.profile} hidden {...register("profileIMG")} />
                </React.Fragment>
              ))}

              <div className="form-group">
                <label htmlFor="category">Select a Category</label>
                <select name="category" required className="form-control">
                  <option value="">Choose...</option>
                  {categories.map(category => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="title">Service Title</label>
                <input
                  required
                  {...register("title")}
                  className="form-control"
                  placeholder='Your Service Title'
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Monthly Charge</label>
                <input
                  required
                  type="number"
                  {...register("price")}
                  className="form-control"
                  placeholder='Monthly Charge'
                />
              </div>

              <div className="form-group">
                <label htmlFor="img">Image URL</label>
                <input
                  required
                  {...register("img")}
                  className="form-control"
                  placeholder='Image URL'
                />
              </div>

              <div className="form-group">
                <label htmlFor="details">Service Details</label>
                {/* <textarea
                  required
                  {...register("details")}
                  className="form-control"
                  placeholder='Service Details'
                /> */}
                <JoditEditor
                  required
                  {...register("details")}
                  ref={editor}
                  value={content}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              
                  onChange={(newContent) => setContent(newContent)}


                />
                <input type="hidden" {...register('details')} value={content} />

              </div>

              <button type="submit" className='btn btn-primary'>
                Submit Service
              </button>
            </form>
          </div>
        )}

        {myDatas.length === 0 && (
          <div>
            <button className='btn btn-warning'>
              <Link className='text-white' to={'/update'}>
                Please Update Your Provider Account
              </Link>
            </button>
          </div>
        )}

        {clients.length === 1 && (
          <div>
            <button className='btn btn-danger'>
              Sorry, Buyers cannot add any service.
            </button>
          </div>
        )}

      </div>

    </>
  );
};

export default AddService;