import React from 'react';

const City = ({city, updateCity}) => {
    return (
        <React.Fragment>
            <select defaultValue={city} onChange={updateCity} >
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Tokyo">Tokyo</option>
            </select>
        </React.Fragment>
    )
}

export default City;