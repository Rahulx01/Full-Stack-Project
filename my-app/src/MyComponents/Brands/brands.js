import BrandsCoupans from './brandsCoupan';
import React, {useState} from 'react';

export default function Brands(){
    const [companies,setCompanies] = useState(
        [
            {
                sno: 1,
                title:"only 10% off",
                desc:"it is on coupans"
            },
            {
                sno: 2,
                title:"only 20% off",
                desc:"it is on coupans"
            },
            {
                sno: 3,
                title:"yes 50% off",
                desc:"it is on coupans"
            }
        ]
    )

    function onDelete(particilarCompine){
        setCompanies(companies.filter((e) =>{
            return e!==particilarCompine;
        }))
    }
    return(
        <div className='container'>
            {companies.map((company) =>{
                return <BrandsCoupans companies={company} onDelete={onDelete}/>
            })}
        </div>
    )
}