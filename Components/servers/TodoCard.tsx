import React from 'react'
import "./todoCard.css"

const TodoCard = ({title,description}) => {
  return (
    <div className="todoCard">
       <h3>{title}</h3>
       <p>{description}</p>
    </div>
  )
}

export default TodoCard