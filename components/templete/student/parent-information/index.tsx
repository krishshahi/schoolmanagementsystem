import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { theme } from "../../../../theme";
import { TextField, Select } from "../../../common";
import { DROPDOWN } from "../../../../constants";
import { ImageUpload } from "../../../common";
export interface InfoProps {
	title?: string;
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
		flex-wrap: wrap;
		gap: 0px 10px;
		& .field-class {
			margin-bottom: 20px;
		}
	}
	.upload {
		width: 500px;
	}
`;

const Title = styled.div`
	${theme.typography.typographyH3}
	margin-bottom: 30px;
	text-decoration: underline;
	font-weight: normal;
`;

const ParentInformation: React.FC<InfoProps> = ({ title }) => {
	const { t } = useTranslation();

	return (
		<>
			<Wrapper>
				<form>
					<div className={"align-row"}>
						<TextField
							label={t("Father's Name")}
							placeholder={t("Father's Name")}
							name={"father_name"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Mother's Name")}
							placeholder={t("Mother's Name")}
							name={"mother_name"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Contact")}
							placeholder={t("Contact")}
							name={"contact"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Email")}
							placeholder={t("Email")}
							name={"email"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Occupation")}
							placeholder={t("Occupation")}
							name={"occupation"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
					</div>
					<Title>{t("Local Guardian")}</Title>
					<div className={"align-row"}>
						<TextField
							label={t("Guardian Name")}
							placeholder={t("Guardian Name")}
							name={"guardian_name"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<Select
							label={`${t("Relation")}`}
							placeholder={t("Please Select")}
							name={"relation"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"200px"}
						/>
						<TextField
							label={t("Contact")}
							placeholder={t("Contact")}
							name={"g_contact"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Email")}
							placeholder={t("Email")}
							name={"g_email"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Occupation")}
							placeholder={t("Occupation")}
							name={"g_occupation"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Citizenship No.")}
							placeholder={t("Citizenship No.")}
							name={"citizenship_no"}
							width={"550px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<ImageUpload
							label={t("Upload")}
							type="pdf"
							width={"550px"}
							wrapperClassName="upload"
						/>
					</div>
				</form>
			</Wrapper>
		</>
	);
};

export { ParentInformation };
