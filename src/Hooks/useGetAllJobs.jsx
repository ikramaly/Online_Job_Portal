import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../Utils/Constant';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../Redux/jobSlice';
import { readDemoJobs } from '../Utils/demoJobs';

export default function useGetAllJobs() {
    const dispatch = useDispatch();
    useEffect(()=>{
        if (import.meta.env.VITE_DEMO_MODE !== 'false') {
        dispatch(setAllJobs(readDemoJobs().filter((job) => !job.archivedAt)));
            return;
        }

        const fetchAllJobs = async () =>{
            try{
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {
                    withCredentials:true
                });
            if(res.data.success){
                 dispatch(setAllJobs(res.data.jobs));
            }

            }catch{
                // Keep the student-facing demo useful when the optional API is offline.
                dispatch(setAllJobs(readDemoJobs().filter((job) => !job.archivedAt)));
            }
        }
        fetchAllJobs();
    },[dispatch]);
}
