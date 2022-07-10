import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TextField, Select, Button } from "../../common";
import { DROPDOWN } from "../../../constants";
import { theme } from "../../../theme";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	LockOutlined,
	SaveOutlined,
	CloseCircleOutlined,
} from "@ant-design/icons";
import { IUserGroup } from "../../../interfaces";
import { UseMutateFunction } from "react-query";

export interface InfoProps {
	id?: string;
	isLoading?: boolean;
	onSubmit?: UseMutateFunction<IUserGroup, unknown, IUserGroup | void>;
	data?: IUserGroup;
}
const Wrapper = styled.div`
	& .align-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
		& .field-class {
			margin-bottom: 20px;
		}
		.steps-action {
			float: right;
		}
	}
`;
const ButtonStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	justify-content: end;
	width: 100%;
	gap: 10px;
`;

const UserGroupComponent: React.FC<InfoProps> = ({
	isLoading,
	onSubmit,
	data,
}) => {
	const { t } = useTranslation();

	const validationSchema = yup.object().shape({
		full_name: yup.string().required(t("Required")),
		email: yup.string().required(t("Required")),
		role: yup.string().required(t("Required")),
		status: yup.string().required(t("Required")),
		username: yup.string().required(t("Required")),
		password: yup.string().required(t("Required")),
		confirm_password: yup
			.string()
			.when("password", {
				is: (val) => !!val,
				then: yup.string().required(t("Required")),
			})
			.oneOf([yup.ref("password"), null], t("Your passwords do not match.")),
	});

	const initialValues: IUserGroup = data || {
		full_name: "",
		email: "",
		role: "",
		status: "",
		username: "",
		password: "",
		confirm_password: "",
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			console.log("valuess", values);
			// onSubmit(values)
		},
	});

	return (
		<>
			<Wrapper>
				<form onSubmit={formik.handleSubmit}>
					<div className={"align-row"}>
						<TextField
							label={t("Full Name")}
							placeholder={t("Full Name")}
							name={"full_name"}
							width={"260px"}
							className={"field-class"}
							labelClassName={"label-style"}
							onChange={formik.handleChange}
							value={formik.values.full_name}
							error={formik.touched.full_name && formik.errors.full_name}
							onBlur={formik.handleBlur}
							required
						/>
						<TextField
							label={t("Email")}
							placeholder={t("Email")}
							name={"email"}
							width={"260px"}
							className={"field-class"}
							labelClassName={"label-style"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							error={formik.touched.email && formik.errors.email}
							required
						/>
						<Select
							label={`${t("Role")}`}
							placeholder={t("Please Select")}
							name={"role"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"260px"}
							onChange={(val) => {
								formik.setFieldValue("role", val);
							}}
							value={formik.values.role}
							error={formik.touched.role && formik.errors.role}
							required
						/>
						<Select
							label={`${t("Status")}`}
							placeholder={t("Please Select")}
							name={"status"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"260px"}
							onChange={(val) => {
								formik.setFieldValue("status", val);
							}}
							value={formik.values.status}
							error={formik.touched.status && formik.errors.status}
							required
						/>

						<TextField
							label={t("Username")}
							placeholder={t("Username")}
							name={"username"}
							width={"350px"}
							className={"field-class"}
							labelClassName={"label-style"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
							error={formik.touched.username && formik.errors.username}
							required
						/>
						<TextField
							name="password"
							type="password"
							placeholder="password"
							width={"350px"}
							prefix={<LockOutlined />}
							label={t("Password")}
							bgcolor="white"
							className="login-text-field"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							error={formik.touched.password && formik.errors.password}
							required
						/>
						<TextField
							name="confirm_password"
							type="password"
							bgcolor="white"
							placeholder="password"
							width={"350px"}
							prefix={<LockOutlined />}
							label={t("Confirm Password")}
							className="login-text-field"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.confirm_password}
							error={
								formik.touched.confirm_password &&
								formik.errors.confirm_password
							}
							required
						/>
						<ButtonStyle>
							<Button
								type="primary"
								fontSize={"16px"}
								borderradius={"3px"}
								icon={<SaveOutlined />}
								height={"40px"}
								padding={"0px 10px"}
								buttonClassName={"submit-button"}
								htmlType={"submit"}
							>
								{t("Submit")}
							</Button>

							<Button
								type="default"
								background={theme.gray2}
								color={theme.darkGray1}
								bordercolor={theme.darkGray2}
								hovercolor="transparent"
								icon={<CloseCircleOutlined />}
								activecolor={theme.darkGray2}
								fontSize={"16px"}
								borderradius={"3px"}
								height={"40px"}
								padding={"0px 10px"}
								buttonClassName={"submit-button"}
							>
								{t("Cancel")}
							</Button>
						</ButtonStyle>
					</div>
				</form>
			</Wrapper>
		</>
	);
};

export { UserGroupComponent };
