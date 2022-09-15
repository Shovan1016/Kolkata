import React from 'react'
import head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail'
import {MongoClient,ObjectId} from 'mongodb'

const MeetupDetails = (props) => {
  return (
    <>
    <head>
      <title>{props.meetupData.title}</title>
      <meta name='description' content={props.meetupData.description}/>
    </head>
    <div><MeetupDetail image={props.meetupData.image} title={props.meetupData.title} adress={props.meetupData.address} description={props.meetupData.description}/></div>
    </>
  )
}

export default MeetupDetails

export async function getStaticPaths()
{
  const client = await MongoClient.connect(
    'mongodb+srv://shovan:shovan@cluster0.btlavhe.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups=await meetupsCollection.find({},{_id:1}).toArray();
  client.close();

  return{
    fallback:false,
    paths:meetups.map((meetup)=>({
      params: {meetupId: meetup._id.toString()}
    }))
  }
}



export async function getStaticProps(context)
{
  const meetupId=context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://shovan:shovan@cluster0.btlavhe.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close()

  return{
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  }
}