import React from "react";
import styled from "styled-components";
import { Checkbox } from "antd";
import { useRouter } from "next/router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, TextField } from "../../components";

const Container = styled.div`
	width: 100%;
	display: grid;
	height: 100vh;
	grid-template-columns: 52% 30%;
	align-content: center;

	.ant-checkbox-checked .ant-checkbox-inner {
		background-color: #30cd40;
		border-color: #30cd40;
	}
`;
const LoginBanner = styled.div`
	display: grid;
	justify-content: end;
	img {
		width: 600px;
		height: 510px;
	}
`;

const LoginContent = styled.div`
	background-color: white;
	display: grid;
	justify-content: start;
`;

const LoginWrapper = styled.div`
	width: 400px;
	padding-top: 50px;
	& .heading {
		font-family: inter;
		font-size: 32px;
		line-height: 39px;
		display: flex;
		align-items: center;
		margin-top: 18px;
		margin-bottom: 0;
		letter-spacing: 3px;
	}

	& .sub-heading {
		color: gray;
		font-family: inter;
		letter-spacing: 1px;
		font-size: 24px;
		line-height: 29px;
	}

	& .forget-link {
		text-align: center;
		margin-bottom: 28px;
		& a {
			text-decoration: underline;
			color: rgba(17, 15, 36, 0.4);
		}
	}
`;
const TextFieldWrapper = styled.div`
	margin-top: 20px;
`;

const InputFieldWrapper = styled.div`
	margin-bottom: 15px;
	& .login-text-field {
		& input {
			background: #f6f6f9 !important;
		}
		& div {
			font-size: 16px;
			line-height: 22px;
			font-weight: 700;
			margin-bottom: 5px;
			color: #110f24;
		}
	}
`;

const Login = () => {
	const routers = useRouter();
	const onChange = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

	return (
		<Container>
			<LoginBanner>
				<img src="/assets/logo.jpeg" />
			</LoginBanner>
			<LoginContent>
				<LoginWrapper>
					<h1 className="heading">Welcome Back !</h1>
					<h3 className="sub-heading">Login to continue</h3>
					<TextFieldWrapper>
						<form>
							<InputFieldWrapper>
								<TextField
									name="email"
									label="username"
									placeholder="username"
									bgcolor="#f6f6f9"
									prefix={<UserOutlined />}
									className="login-text-field"
								/>
							</InputFieldWrapper>
							<InputFieldWrapper>
								<TextField
									name="password"
									type="password"
									bgcolor="#f6f6f9"
									placeholder="password"
									prefix={<LockOutlined />}
									label="password"
									className="login-text-field"
								/>
							</InputFieldWrapper>
							<InputFieldWrapper>
								<Checkbox onChange={onChange}>Remember me</Checkbox>
							</InputFieldWrapper>
							<Button
								width="100%"
								type="primary"
								onClick={() => routers.push("/dashboard")}
							>
								Login
							</Button>
						</form>
					</TextFieldWrapper>
				</LoginWrapper>
			</LoginContent>
		</Container>
	);
};

export default Login;
