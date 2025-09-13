import React from 'react'


import { useState } from 'react';
import './form.css';

const Form = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    phone: "",
    email: ""
  });

  const handleImputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(user);

    alert('Your form is submitted successfully');

    setUser({
      name:'',
      password:'',
      phone:'',
      email:''
    });
  };


  return (
    <div className='flex h-90 w-60 bg-blue-400 ml-150 mt-50 rounded-2xl'>
      
      <form className='flex flex-col mx-10 gap-3 font-sans ' onSubmit={handleFormSubmit}>
        <h1 className=' ' >Register Now</h1>
        <label htmlFor="">Enter youre name</label>
        <input  className='' type="text" name="name" placeholder='Enter your name' value={user.name} onChange={handleImputChange} />

        <label htmlFor=""> Password</label>
        <input type="password" name="password" placeholder='Enter your password' value={user.password} onChange={handleImputChange} />

        <label htmlFor="">Phone</label>
        <input type="number" name="phone" placeholder='Enter your  number' value={user.phone} onChange={handleImputChange} />

        <label htmlFor="">Email</label>
        <input type="text" name="email" placeholder='Enter your email address' value={user.email} onChange={handleImputChange} />

        <button type="submit" className='mr-20 bg-amber-100 rounded-2xl my-1.5 cursor-pointer hover:bg-green-300 ' >Submit</button>
      </form>
    </div>
  );
}

export default Form