import { Backdrop, Box, Button, CircularProgress, Grid, TextField } from '@mui/material'
import LG_logo from '../assets/lg_logo_new.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { styled } from '@mui/material/styles';
import AgreementPage from './AgreementPage';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFormHelperText-root': {
        color: 'red',
        marginLeft: '0px',
        fontSize: '0.8rem'
    },
}));
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const btnstyle = { margin: '26px 0', height: '40px' };
    const [username, setUsername] = useState('');
    const [EmpId, setEmpId] = useState('');
    const [captchaVal, setCaptchaVal] = useState('')
    const loginData = useSelector(state => state.auth.user)
    const [userHelperTxt, setUserHelperTxt] = useState('')
    const [empIdHelperTxt, setEmpIdHelperTxt] = useState('')
    const [captchaHelperTxt, setCaptchaHelperTxt] = useState('')
    const [loading, setLoading] = useState(false);
    const agreement = useSelector(state => state.AgreeReducer.agree);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setUserHelperTxt('')

    }
    const handleEmpId = (e) => {
        setEmpId(e.target.value);
        setEmpIdHelperTxt('');

    }
    const handleCaptcha = (e) => {
        setCaptchaVal(e.target.value);
        setCaptchaHelperTxt('');

    }
    const handleLogin = () => {
        if (username.length <= 0) {
            setUserHelperTxt('Enter Username')
        } else if (EmpId.length <= 0) {
            setEmpIdHelperTxt('Enter Employe Id')
        } else if(captcha !== captchaVal){
            setCaptchaHelperTxt('Wrong Captcha!');
            setCaptchaVal('');
            setCaptchaFlag((prev) => !prev);
        }else{
            setLoading(true)
            dispatch(login(username, EmpId)).then(() => {
                setLoading(false)
                navigate('/home'); // Navigate to the home page after successful login
            }).catch((error) => {
                // Login failed
                // Display an error message to the user or perform any necessary action
                setLoading(false);
                setUsername('');
                setEmpId('')
                console.log(error.message);
            });
        }



    }

    useEffect(() => {
        if (loginData !== null) {
            navigate('/home')
        }
    }, [loginData]);

    const [captcha, setCaptcha] = useState();
    const [captchaFlag, setCaptchaFlag] = useState(false);
    const generateRandomString = () => {

        let captcha = Math.floor(Math.random() * Date.now()).toString(36).slice(0, 6);
        for (let i = 0; i < captcha.length; i++) {
            if (Math.random() < 0.5) {
                captcha = captcha.replace(captcha[i], captcha[i].toUpperCase());
            }
        }
        setCaptcha(captcha);

    };

    useEffect(() => {
        generateRandomString();
    }, [captchaFlag])
    
    return (
        <>
            {agreement ?
                <Grid style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>

                    <Grid align='center' style={{ marginTop: '100px' }}>
                        <img src={LG_logo} style={{ width: '134px' }} alt='logo' />
                    </Grid>


                    <Grid style={{ padding: '14px' }} align='center'>
                        <h1>Sign In</h1>
                        <CustomTextField
                            label='Username'
                            variant="outlined"
                            fullWidth
                            required
                            value={username}
                            helperText={userHelperTxt}
                            onChange={handleUsername}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                style: {
                                    height: "14px",
                                },


                            }}
                            style={{ marginBottom: '15px' }}
                        />
                        <CustomTextField
                            label='Employe Id'
                            variant="outlined"
                            fullWidth
                            required
                            value={EmpId}
                            onChange={handleEmpId}
                            helperText={empIdHelperTxt}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                style: {
                                    height: "14px",
                                },

                            }}
                            style={{ marginBottom: '15px' }}
                        />
                        <CustomTextField
                            label='captcha'
                            variant="outlined"
                            fullWidth
                            required
                            value={captchaVal}
                            onChange={handleCaptcha}
                            helperText={captchaHelperTxt}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                style: {
                                    height: "14px",
                                },

                            }}
                            style={{ marginBottom: '15px' }}
                        />
                        <Box sx={{ background: '#c5c5c5', fontSize: '35px', fontWeight: '500', marginBottom: '15px', borderRadius: '5px' }}>{captcha}<AutorenewIcon sx={{ float: 'right', marginTop: '8px', marginRight: '5px', width: '34px', height: '34px' }} onClick={() => setCaptchaFlag((prev) => !prev)} /></Box>
                        <Button onClick={handleLogin} sx={{ backgroundColor: '#A50035', margin: '26px 0', height: '40px', '&:hover': { backgroundColor: '#A50035' } }} variant="contained" fullWidth >Log In</Button>
                    </Grid>
                    {loading && (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mt={2}
                        >
                            <Backdrop open={loading} style={{ zIndex: 9999, flexDirection: "column" }}>
                                <CircularProgress sx={{ color: 'rgb(34, 41, 57)' }} size={60} />
                            </Backdrop>
                        </Box>)
                    }
                </Grid> :

                <AgreementPage />

            }
        </>

    )
}

export default Login