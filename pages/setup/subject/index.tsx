import { useTranslation } from "react-i18next";
import { PageHeader, SubjectComponent } from "../../../components";
import styled from "styled-components";
import { theme } from "../../../theme";

const Container = styled.div`
	border-top: 5px solid #d2bc4b;
	border-radius: 3px;
	padding: 20px 20px;
	background: ${theme.base};

	& .header-label {
		font-size: 18px;
		font-weight: normal;
		padding-bottom: 8px;
		border-bottom: 1px solid ${theme.gray4};
	}
`;

const Subject = () => {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader
				title={t("Subject")}
				breadcrumbItems={[
					{
						name: t("Home"),
						href: "/",
						key: "home",
					},
					{
						name: t("Subject List"),
						key: "subject-list",
						href: "/setup/subject",
						showListIcon: true,
					},
					{
						name: t("Subject"),
						key: "subject",
					},
				]}
			/>
			<Container>
				<SubjectComponent />
			</Container>
		</>
	);
};

export default Subject;
