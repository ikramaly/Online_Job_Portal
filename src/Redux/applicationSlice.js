// import { createSlice } from "@reduxjs/toolkit";
// import Applicants from "../Admin/Applicants";

// const applicationSlice = createSlice({
//     name:'application',
//     initialState:{
//         applicants:[],
//     },

//     reducers:{
//         setAllApplicants:(state, actions) =>{
//             state.applicants = actions.payload;
//         }
//     }
// })
// export const {setAllApplicants} = applicationSlice.actions;
// export default applicationSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        // Change from [] to null because the backend returns a Job OBJECT, not an array
        applicants: null, 
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        }
    }
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;