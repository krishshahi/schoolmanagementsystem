import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TextField, Select } from "../../common";
import { DROPDOWN } from "../../../constants";
import { theme } from "../../../theme";
export interface InfoProps {
	title?: string;
}
const Wrapper = styled.div`
	& .align-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10px;
		& .field-class {
			margin-bottom: 20px;
		}
	}
`;
const Title = styled.div`
	${theme.typography.typographyH3}
	text-align: center;
	margin-bottom: 30px;
	text-decoration: underline;
	font-weight: normal;
`;

const AddressComponent: React.FC<InfoProps> = ({ title }) => {
	const { t } = useTranslation();

	return (
		<>
			<Wrapper>
				<form>
					<Title>{t("Permanent Address")}</Title>
					<div className={"align-row"}>
						<Select
							label={`${t("Province")}`}
							placeholder={t("Please Select")}
							name={"p_province"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"200px"}
						/>
						<Select
							label={`${t("District")}`}
							placeholder={t("Please Select")}
							name={"p_district"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"200px"}
						/>
						<Select
							label={`${t("Muncipality")}`}
							placeholder={t("Please Select")}
							name={"p_muncipality"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"200px"}
						/>
						<TextField
							label={t("Ward")}
							placeholder={t("Ward")}
							name={"p_ward"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Tole")}
							placeholder={t("Tole")}
							name={"p_tole"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
					</div>
					<br />
					<Title>{t("Temporary Address")}</Title>
					<div className={"align-row"}>
						<Select
							label={`${t("Province")}`}
							placeholder={t("Please Select")}
							name={"t_province"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"200px"}
						/>
						<Select
							label={`${t("District")}`}
							placeholder={t("Please Select")}
							name={"t_district"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"200px"}
						/>
						<Select
							label={`${t("Muncipality")}`}
							placeholder={t("Please Select")}
							name={"t_muncipality"}
							className={"field-class"}
							options={DROPDOWN}
							height={"35px"}
							width={"200px"}
						/>
						<TextField
							label={t("Ward")}
							placeholder={t("Ward")}
							name={"t_ward"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<TextField
							label={t("Tole")}
							placeholder={t("Tole")}
							name={"t_tole"}
							width={"200px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
					</div>
				</form>
			</Wrapper>
		</>
	);
};

export { AddressComponent };
