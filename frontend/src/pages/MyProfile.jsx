import React, {useState, useRef} from 'react'
import Header from "../../components/Header.jsx";
import {
    Avatar,
    Box,
    Divider,
    Button,
    Typography,
    TextField,
    InputAdornment,
    IconButton, FormControl
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import BoxForPrfl from "../../components/BoxForPrfl.jsx";
import InputPassword from "../../components/InputPassword.jsx"
import {useFormik} from "formik";

// make new file for this
import * as yup from "yup";

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const validationSchema = yup.object({
    avatarFile: yup
        .string(),
    username: yup
        .string(),
    email: yup
        .string()
        .email("Invalid email format"),
    old_password: yup
        .string(),
    new_password: yup
        .string()
        .min(8, "Password must be at least 8 characters"),
    confirm_password: yup.string()
        .oneOf([yup.ref('new_password'), null], 'Passwords must match')
});
//////////////////

const onSubmit = (values, actions) => {
    console.log("Submitting user");
    actions.resetForm();
};

// doesn't work :(
const handleCancel = (values, actions) => {
    actions.resetForm();
    /*document.getElementById("profile-form").reset();*/

};


function MyProfile(){
    const [value, setValue] = useState(0);

    const [isChanged, setChanges] = useState(false);
    function handleDataChange(){
        setChanges(true);
    }

    const [isPWHidden1, setPWVisibility1] = useState(true);
    function handleClickPW1 (event){
        event.preventDefault();
        setPWVisibility1(!isPWHidden1);
    }
    const [isPWHidden2, setPWVisibility2] = useState(true);
    function handleClickPW2 (event){
        event.preventDefault();
        setPWVisibility2(!isPWHidden2);
    }
    const [isPWHidden3, setPWVisibility3] = useState(true);
    function handleClickPW3 (event){
        event.preventDefault();
        setPWVisibility3(!isPWHidden3);
    }


    function handleMouseDownPW(event) {
        event.preventDefault();
    }

    const formik = useFormik({
        initialValues: {
            avatarFile: '',
            username: '',
            email: '',
            old_password: '',
            new_password: '',
            confirm_password: ''
        },
        validationSchema: validationSchema,
        onSubmit,
    });

    const [fileName, setFileName] = useState("");
    function handleFileChange(e) {
        console.log(e.target.files);
        setFileName(URL.createObjectURL(e.target.files[0]));
        formik.setFieldValue('avatarFile', fileName);
        handleDataChange()
    }

        // to-do: styled box component
    return <Box sx={{width: '100%'}}>
        <Header value={value} setValue={setValue} />
        <Box
            component="form"
            id="profile-form"
            onSubmit={formik.onSubmit}
            sx={{
            display: "flex",
            padding: "24px 0px",
            flexDirection: "column",
            alignItems: "center",
            gap: 3.5
        }}
        >
        <Typography variant="h3" fontWeight="bold">Profile</Typography>
        <Box
            sx={{
            display: "flex",
            flexDirection: "row",
            gap: 6
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3
                }}
            >
                <Avatar alt="your profile picture" sx={{width: 90, height: 90}} src={fileName}/>
                <input
                    type="file"
                    accept="image/"
                    style={{display: "none"}}
                    id="avatarFile"
                    onChange={handleFileChange}
                    value={formik.values.avatarFile}
                />
                <label htmlFor="avatarFile">
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon/>}
                        component="span">Change avatar</Button>
                </label>
            </Box>
            <Divider orientation="vertical" flexItem/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 3
                }}
            >
                <TextField
                    id="username"
                    label="Username"
                    onChange={e => { formik.handleChange(e); handleDataChange() }}
                    placeholder="Enter your username"
                    value={formik.values.username}
                ></TextField>
                <TextField
                    id="email"
                    label="E-mail"
                    onChange={e => { formik.handleChange(e); handleDataChange() }}
                    placeholder="Enter your email"
                    value={formik.values.email}
                ></TextField>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 3.5
                }}
            >
                <Typography variant="h6">Change Password</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 3
                    }}
                >
                    <InputPassword
                        id="old_password"
                        onChange={e => { formik.handleChange(e); handleDataChange() }}
                        label="Your current password"
                        placeholder="Enter the old password"
                        value={formik.values.old_password}
                        onEyeClick={handleClickPW1}
                        onMouseDown={handleMouseDownPW}
                        isPWHidden={isPWHidden1}
                    />
                    <InputPassword
                        id="new_password"
                        onChange={e => { formik.handleChange(e); handleDataChange() }}
                        label="Your new password"
                        placeholder="Enter the new password"
                        value={formik.values.new_password}
                        onEyeClick={handleClickPW2}
                        onMouseDown={handleMouseDownPW}
                        isPWHidden={isPWHidden2}
                    />
                    <InputPassword
                        id="confirm_password"
                        onChange={e => { formik.handleChange(e); handleDataChange() }}
                        label="Confirm the new password"
                        placeholder="Confirm password"
                        value={formik.values.confirm_password}
                        onEyeClick={handleClickPW3}
                        onMouseDown={handleMouseDownPW}
                        isPWHidden={isPWHidden3}
                    />
                </Box>
            </Box>
        </Box>
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3
            }}
        >
            {isChanged ? <><Button variant="contained" type="submit">Save changes</Button>
                            <Button variant="outlined"
                                    onClick={handleCancel}>Cancel</Button></>
            : <><Button variant="contained" type="submit" disabled>Save changes</Button>
                    <Button variant="outlined" onClick={handleCancel} disabled>Cancel</Button></>}
        </Box>
    </Box>
    </Box>
}

export default MyProfile;
