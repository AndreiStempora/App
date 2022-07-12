import React from 'react'
import './dealershipElement.scss'

const DealershipElement = ({dealership}) => {
    return (
        <div className="dealership-element">
        <div className='element-title'>{dealership.dealership_name}</div>
            <img src={dealership.dealership_logo} alt=""/>
        </div>

    )
}

export default DealershipElement