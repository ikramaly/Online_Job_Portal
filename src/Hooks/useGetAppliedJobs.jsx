import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_END_POINT } from "../Utils/Constant";
import { setAllAppliedJobs } from "../Redux/jobSlice";
const useGetAppliedJobs = ({ enabled = true } = {}) =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        if (!enabled) return;
        const fetchAppliedJobs = async () =>{
            try{
                const res = await axios(`${APPLICATION_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
                console.log(res.data);

            }catch(error){
                console.log(error);

            }
        }
        fetchAppliedJobs();

},[dispatch, enabled]);
}
export default useGetAppliedJobs;
