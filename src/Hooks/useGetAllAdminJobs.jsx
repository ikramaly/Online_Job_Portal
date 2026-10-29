import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../Utils/Constant';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs} from '../Redux/jobSlice';


export default function useGetAllAdminJobs() {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () =>{
            try{
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                    withCredentials:true
                });
            if(res.data.success){
                 dispatch(setAllAdminJobs(res.data.jobs));
            }

            }catch(error){
                console.log(error);

            }
        }
        fetchAllAdminJobs();
    },[]);
}