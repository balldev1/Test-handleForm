import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
    prefix: localStorage.getItem("prefix") || "",
    firstname: localStorage.getItem("firstname") || "",
    lastname: localStorage.getItem("lastname") || "",
    date: localStorage.getItem("date") || "",
    nation: localStorage.getItem("nation") || "",
    idcard: localStorage.getItem("idcard") || "",
    gender: localStorage.getItem("gender") || "",
    phonenumber: localStorage.getItem("phonenumber") || "",
    passport: localStorage.getItem("passport") || "",
    salary: localStorage.getItem("salary") || ""
}
    ;

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addPrefix: (state, action) => {
            state.prefix = action.payload;
            localStorage.setItem("prefix", action.payload);
        },
        addFirstname: (state, action) => {
            state.firstname = action.payload;
            localStorage.setItem('firstname', action.payload);
        },
        addLastname: (state, action) => {
            state.lastname = action.payload;
            localStorage.setItem('lastname', action.payload);
        },
        addDate: (state, action) => {
            state.date = action.payload;
            localStorage.setItem('date', action.payload);
        },
        addNation: (state, action) => {
            state.nation = action.payload;
            localStorage.setItem('nation', action.payload);
        },
        addIdcard: (state, action) => {
            state.idcard = action.payload;
            localStorage.setItem('idcard', action.payload);
        },
        addGender: (state, action) => {
            state.gender = action.payload;
            localStorage.setItem('gender', action.payload);
        },
        addPhoneumber: (state, action) => {
            state.phonenumber = action.payload;
            localStorage.setItem('phonenumber', action.payload);
        },
        addPassport: (state, action) => {
            state.passport = action.payload;
            localStorage.setItem('passport', action.payload);
        },
        addSalary: (state, action) => {
            state.salary = action.payload;
            localStorage.setItem('salary', action.payload);
        },


    },

});

export const { addPrefix, addFirstname, addLastname, addDate, addNation, addIdcard, addGender, addPhoneumber, addPassport, addSalary,
    updateUser
} = userSlice.actions;

export default userSlice.reducer;
