import axios from 'axios'
import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT} from '../Utils/Constant';
import { useDispatch } from 'react-redux';
// import { setAllJobs, setSingleJob } from '../Redux/jobSlice';
import { setCompanies} from '../Redux/companySlice';


export default function useGetAllCompanies(companyId) {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () =>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials:true
                });
            if(res.data.success){
                 dispatch(setCompanies(res.data.companies));
            }

            }catch(error){
                console.log(error);

            }
        }
        fetchCompanies();
    },[]);
}
