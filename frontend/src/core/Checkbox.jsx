import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        // RETURN THE FIRST INDEX OR -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];

        // IF CURRENTLY CHECKED WAS NOT ALREADY IN CHECKED STATE > PUSH
        // ELSE PULL/TAKE-OFF
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

  return categories?.data?.map((c, i) => (
    <li key={i} className='list-unstyled'>
        <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type='checkbox' className='form-check-input' />
        <label className='form-check-label'>{c.name}</label>
    </li>
  ));
};

Checkbox.propTypes = {
    handleFilters: PropTypes.func,
    checked: PropTypes.array,
    handleToggle: PropTypes.func
}

export default Checkbox