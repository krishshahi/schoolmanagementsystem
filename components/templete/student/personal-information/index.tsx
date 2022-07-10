import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageUpload, TextField, DatePicker, Button } from "../../../common";
import { CalendarOutlined, CloseOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { useFormik } from "formik";
import { IStudent } from "../../../../interfaces";
import { UseMutateFunction } from "react-query";
export interface InfoProps {
	id?: string;
	isLoading?: boolean;
	onSubmit?: UseMutateFunction<IStudent, unknown, IStudent | void>;
	data?: IStudent;
}
const Wrapper = styled.div`
	.main-container {
		display: flex;
		gap: 20px;
	}
	& .align-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 0px 10px;
		flex-wrap: wrap;
		& .field-class {
			margin-bottom: 20px;
		}
		& .field-classes {
			margin-bottom: 20px;
			width: 280px;
		}
	}
`;

const PersonalInformation: React.FC<InfoProps> = ({
	isLoading,
	onSubmit,
	data,
}) => {
	const { t } = useTranslation();
	const validationSchema = yup.object().shape({
		session: yup.string().required(t("Required")),
	});
	const initialValues: IStudent = data || {
		session: "",
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
					<div className="main-container">
						<div>
							<ImageUpload type="image" />
						</div>
						<div className={"align-row"}>
							<TextField
								label={t("Session")}
								placeholder={t("Session")}
								name={"session"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
								error={formik.touched.session && formik.errors?.session}
								value={formik.values.session}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								required
							/>
							<TextField
								label={t("Roll No.")}
								placeholder={t("Roll No.")}
								name={"roll_no"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<DatePicker
								label={t("Admission Date")}
								wrapperClassName={"field-classes"}
								labelClassName={"label-style"}
								format={"YYYY/MM/DD"}
								width={"270px"}
								suffixIcon={<CalendarOutlined />}
							/>
							<TextField
								label={t("First Name")}
								placeholder={t("First Name")}
								name={"first_name"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<TextField
								label={t("Middle Name")}
								placeholder={t("Middle Name")}
								name={"middle_name"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<TextField
								label={t("Last Name")}
								placeholder={t("Last Name")}
								name={"last_name"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<DatePicker
								label={t("DOB")}
								wrapperClassName={"field-classes"}
								labelClassName={"label-style"}
								format={"YYYY/MM/DD"}
								width={"270px"}
								suffixIcon={<CalendarOutlined />}
							/>

							<TextField
								label={t("Contact")}
								placeholder={t("Contact")}
								name={"contact"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<TextField
								label={t("Grade")}
								placeholder={t("Grade")}
								name={"grade"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<TextField
								label={t("Section")}
								placeholder={t("Section")}
								name={"section"}
								width={"420px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<TextField
								label={t("Status")}
								placeholder={t("Status")}
								name={"status"}
								width={"420px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
						</div>
					</div>
				</form>
			</Wrapper>
		</>
	);
};

export { PersonalInformation };
