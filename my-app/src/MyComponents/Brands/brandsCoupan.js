    import React from 'react';

export default function BrandsCoupans(props){
    return(
        <>
            <h3>{props.companies.sno}</h3>
            <p>{props.companies.title}</p>
            <button className='btn btn-danger btn-sm' onClick={()=>{props.onDelete(props.companies)}}>delete</button>
        </>
    )
}