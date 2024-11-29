import React from 'react'

const Card = (props) => {
  const { name, price, description, id } = props.phone
  const { deleteItem } = props
  return (
    <div className='border-2 rounded-md p-3 mb-5 bg-blue-400'>
      <h3>{name}</h3>
      <h3>{price}</h3>
      <p>{description}</p>
      <span>{id}</span><br />
      <button onClick={()=>{deleteItem(id)}} className='bg-red-500 py-3 px-5 rounded-md text-white'>delete</button>
    </div>
  )
}

export default Card
