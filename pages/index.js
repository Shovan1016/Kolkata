import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'
import {MongoClient} from 'mongodb'




const Home = (props) => {


  return (
    <>
    <Head>
      <title>This is Shovan</title>
      <meta name="description" content="This is a Next js Project" />
    </Head>
    
   <MeetupList meetups={props.meetups}/>
    </>
    
  )
}

export async function getServerSideProps(){
  const client = await MongoClient.connect(
    'mongodb+srv://shovan:shovan@cluster0.btlavhe.mongodb.net/?retryWrites=true&w=majority'
);
const db = client.db();
const meetupsCollection = db.collection('meetups');

const meetups=await meetupsCollection.find().toArray();

client.close();



  return{
    props:{
      meetups: meetups.map(meetup=>({
        title:meetup.title,
        image:meetup.image,
        address:meetup.address,
        id:meetup._id.toString(),
        description:meetup.description

      }
      ))
    }
  }
}

// export async function getStaticProps(){
//   return{
//     props:{
//       meetups:DUMMY_MEET
//     },
//     revalidate:10
//   }

// }

export default Home