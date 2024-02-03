import React, { useContext, useState, useEffect } from 'react';
import classes from './Login.module.css';
import { LoginSignupHeader } from '../../cmps/LoginSignupHeader/LoginSignupHeader';
import { validation } from '../../general/validation';
import userIcon from '../../Icons/user.png';
import lockIcon from '../../Icons/lock.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getUser, logIn } from '../../fetchCalls/authCalls';
import { userContext } from '../../general/userContext';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const Login = () => {
	const { handleSubmit, register } = useForm();
	const { setUser } = useContext(userContext);
	const [isError, setIsError] = useState(false);
	const navigate = useNavigate();

	const onLogIn = async (data, e) => {
		e.preventDefault();
		setIsError(false);

		try {
			const user = await logIn(data);
			console.log(user);
			setUser(user);
			console.log('logged in successfully ');

			navigate('/home');
		} catch (error) {
			console.log('couldnt log in');
			setIsError(true);
		}
	};

	const logUser = user => {
		setUser(user);
		navigate('/home');
	};

	const SCOPES =
		'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar';

	const googleLogin = useGoogleLogin({
		scope: SCOPES,
		onSuccess: async response => {
			try {
				const userData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: {
						Authorization: `Bearer ${response.access_token}`,
					},
				});

				const user = await getUser({ email: userData.data.email });
				console.log(response);

				if (user) {
					user.access_token = response.access_token;
					logUser(user);
				} else navigate('/signup', { state: { user: userData.data } });
			} catch (err) {
				console.error('Error fetching user data:', err);
			}
		},
	});

	return (
		<div className={classes.loginContainer}>
			<LoginSignupHeader />

			<h2 className={classes.welcomeHeader}> ברוכים הבאים </h2>

			<form className={classes.loginForm} onSubmit={handleSubmit(onLogIn)}>
				<h3>כניסה לחשבונך</h3>
				<div className={classes.inputWrapper}>
					<img className={classes.icon} src={userIcon} alt='logo' />
					<input
						className={classes.inputTxt}
						type='text'
						placeholder='אימייל'
						{...register('email', {
							required: true,
							validate: validation.isEmailValid,
						})}
					/>
				</div>
				<div>
					<div className={classes.inputWrapper}>
						<img className={classes.icon} src={lockIcon} alt='logo' />
						<input
							className={classes.inputPW}
							type='password'
							placeholder='סיסמא'
							{...register('password', {
								required: true,
								validate: validation.isPasswordStrong,
							})}
						/>
					</div>
				</div>

				{isError && <p className={classes.errorMsg}>אחד או יותר מהשדות אינו נכון</p>}

				<div className={classes.actionsWrapper}>
					<button onClick={googleLogin}>
						<span>הרשמה למערכת</span>
						<img
							src='https://res.cloudinary.com/dimirmc9j/image/upload/v1674739590/icons8-google-48_serqxw.png'
							alt='גוגל'
						/>
					</button>

					<a> שכחתי סיסמא </a>
				</div>
				<button>כניסה</button>
			</form>
		</div>
	);
};
