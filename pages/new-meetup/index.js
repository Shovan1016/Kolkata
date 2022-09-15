import React from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router';

const NewMeetupPage = () => {

  const router=useRouter()

  async function addMettupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    router.replace('/');

    console.log(data);
       
    }

  return (
    <NewMeetupForm onAddMeetup={addMettupHandler}/>
  )
}

export default NewMeetupPage