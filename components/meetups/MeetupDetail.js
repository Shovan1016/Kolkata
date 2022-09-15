import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const MeetupDetail = (props) => {
  return (
    <div className="border border-info p-5 rounded">
        <div className="text-center"><img src={props.image} alt={props.title} className="w-75 h-50"/></div>
        <div className="text-center mt-1"><h1>{props.title}</h1></div>
        <div className="text-center mt-2 mb-2"><p>{props.description}</p></div>
        <div className="text-center">{props.adress}</div>
    </div>
  )
}

export default MeetupDetail