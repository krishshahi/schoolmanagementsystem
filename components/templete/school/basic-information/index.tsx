import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageUpload, TextField, DatePicker, Select } from "../../../common";
import { CalendarOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { useFormik } from "formik";
import { IStudent } from "../../../../interfaces";
import { UseMutateFunction } from "react-query";
import { DROPDOWN } from "../../../../constants";

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
			margin-bottom: 5px;
		}
		& .field-classes {
			margin-bottom: 5px;
			width: 280px;
		}
	}
`;

const BasicInformation: React.FC<InfoProps> = ({
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
								label={t("School Name")}
								placeholder={t("School Name")}
								name={"school_name"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
								error={formik.touched.session && formik.errors?.session}
								value={formik.values.session}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								required
							/>
							<Select
								label={`${t("Type")}`}
								placeholder={t("Please Select")}
								name={"type"}
								className={"field-class"}
								options={DROPDOWN}
								height={"35px"}
								width={"270px"}
							/>
							<TextField
								label={t("Pan No.")}
								placeholder={t("Pan No.")}
								name={"pan_no"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<DatePicker
								label={t("Established Date")}
								wrapperClassName={"field-classes"}
								labelClassName={"label-style"}
								format={"YYYY/MM/DD"}
								width={"270px"}
								suffixIcon={<CalendarOutlined />}
							/>
							<TextField
								label={t("Level")}
								placeholder={t("Level")}
								name={"level"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<TextField
								label={t("Email")}
								placeholder={t("Email")}
								name={"email"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
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
								label={t("Phone No.")}
								placeholder={t("Phone No.")}
								name={"ph_no"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<TextField
								label={t("Website Url")}
								placeholder={t("Website Url")}
								name={"website_url"}
								width={"270px"}
								className={"field-class"}
								labelClassName={"label-style"}
							/>
							<Select
								label={`${t("Status")}`}
								placeholder={t("Please Select")}
								name={"status"}
								className={"field-class"}
								options={DROPDOWN}
								height={"35px"}
								width={"270px"}
							/>
						</div>
					</div>
				</form>
			</Wrapper>
		</>
	);
};

export { BasicInformation };
