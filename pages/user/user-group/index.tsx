import { useTranslation } from "react-i18next";
import { PageHeader, UserGroupComponent } from "../../../components";
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

const UserGroup = () => {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader
				title={t("User Group")}
				breadcrumbItems={[
					{
						name: t("Home"),
						href: "/",
						key: "home",
					},
					{
						name: t("User Group List"),
						key: "group-list",
						href: "/user/user-group",
						showListIcon: true,
					},
					{
						name: t("User Group"),
						key: "user-group",
					},
				]}
			/>
			<Container>
				<UserGroupComponent />
			</Container>
		</>
	);
};

export default UserGroup;
