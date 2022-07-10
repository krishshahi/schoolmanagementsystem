import { useTranslation } from "react-i18next";
import {
	PersonalInformation,
	AddressComponent,
	ParentInformation,
	Facility,
	Steps,
} from "../../../components";
import styled from "styled-components";
import { theme } from "../../../theme";
import { PageHeader } from "../../../components";

const Container = styled.div`
	border-top: 5px solid #d2bc4b;
	border-radius: 3px;
	padding: 10px 10px;
	background: ${theme.base};

	& .header-label {
		font-size: 18px;
		font-weight: normal;
		padding-bottom: 8px;
		border-bottom: 1px solid ${theme.gray4};
	}
`;

const Student = () => {
	const { t } = useTranslation();

	const steps = [
		{
			title: t("Personal Information"),
			content: <PersonalInformation />,
		},
		{
			title: t("Address"),
			content: <AddressComponent />,
		},
		{
			title: t("Parent Information"),
			content: <ParentInformation />,
		},
		{
			title: t("Facility"),
			content: <Facility />,
		},
	];
	return (
		<>
			<PageHeader
				title={t("Student Registration")}
				breadcrumbItems={[
					{
						name: t("Home"),
						href: "/",
						key: "home",
					},
					{
						name: t("Student Registration"),
						key: "Student Registration",
					},
				]}
			/>
			<Container>
				<Steps steps={steps} />
			</Container>
		</>
	);
};

export default Student;
