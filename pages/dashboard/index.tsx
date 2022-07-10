import { useTranslation } from "react-i18next";
import { PageHeader } from "../../components";
import styled from "styled-components";
import { theme } from "../../theme";

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

const Dashboard = () => {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader
				title={t("Dashboard")}
				breadcrumbItems={[
					{
						name: t("Home"),
						key: "home",
					},
				]}
			/>
			<Container>
				<h1>Dashboard</h1>
			</Container>
		</>
	);
};

export default Dashboard;
