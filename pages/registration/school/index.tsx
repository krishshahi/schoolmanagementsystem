import { useTranslation } from "react-i18next";
import {
	BasicInformation,
	AddressComponent,
	Document,
	Module,
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

const School = () => {
	const { t } = useTranslation();

	const steps = [
		{
			title: t("Basic Information"),
			content: <BasicInformation />,
		},
		{
			title: t("Address"),
			content: <AddressComponent />,
		},
		{
			title: t("Document"),
			content: <Document />,
		},
		{
			title: t("Module"),
			content: <Module />,
		},
	];
	return (
		<>
			<PageHeader
				title={t("School Registration")}
				breadcrumbItems={[
					{
						name: t("Home"),
						href: "/",
						key: "home",
					},
					{
						name: t("School Registration"),
						key: "School Registration",
					},
				]}
			/>
			<Container>
				<Steps steps={steps} />
			</Container>
		</>
	);
};

export default School;
