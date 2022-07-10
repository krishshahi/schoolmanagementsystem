import { useTranslation } from "react-i18next";
import { PageHeader, UserPermissionComponent } from "../../../components";
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

const UserPermission = () => {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader
				title={t("User Permission")}
				breadcrumbItems={[
					{
						name: t("Home"),
						href: "/",
						key: "home",
					},
					{
						name: t("User Permission List"),
						key: "permission-list",
						href: "/user/user-permission",
						showListIcon: true,
					},
					{
						name: t("User Permission"),
						key: "user-permission",
					},
				]}
			/>
			<Container>
				<UserPermissionComponent />
			</Container>
		</>
	);
};

export default UserPermission;
