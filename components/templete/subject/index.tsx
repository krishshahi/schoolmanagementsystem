import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { TextField, Select, Button } from "../../common";
import { theme } from "../../../theme";
import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { DROPDOWN } from "../../../constants";
import { ISubject } from "../../../interfaces";
import { UseMutateFunction } from "react-query";

export interface InfoProps {
	id?: string;
	isLoading?: boolean;
	onSubmit?: UseMutateFunction<ISubject, unknown, ISubject | void>;
	data?: ISubject;
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
		& .field-classes {
			margin-bottom: 20px;
			margin-right: 15px;
			width: 500px;
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

const SubjectComponent: React.FC<InfoProps> = ({
	isLoading,
	onSubmit,
	data,
}) => {
	const { t } = useTranslation();
	const validationSchema = yup.object().shape({
		class: yup.string().required(t("Required")),
		subject_name: yup.string().required(t("Required")),
	});
	const initialValues: ISubject = data || {
		class: "",
		subject_name: "",
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
						<Select
							label={`${t("Class")}`}
							placeholder={t("Please Select")}
							onChange={(val) => {
								formik.setFieldValue("class", val);
							}}
							value={formik.values.class}
							name={"class"}
							className={"field-classes"}
							options={DROPDOWN}
							height={"35px"}
							error={formik.touched.class && formik.errors.class}
							required
						/>
						<TextField
							label={t("Subject")}
							placeholder={t("Subject")}
							name={"subject_name"}
							width={"550px"}
							className={"field-class"}
							labelClassName={"label-style"}
							error={formik.touched.subject_name && formik.errors?.subject_name}
							value={formik.values.subject_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
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

export { SubjectComponent };
