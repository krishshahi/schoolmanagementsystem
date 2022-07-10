import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { theme } from "../../../theme";
import { MenuGenerator } from "../../common";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
	AppstoreOutlined,
	ProfileOutlined,
	DownOutlined,
	LeftOutlined,
	UserOutlined,
	SettingOutlined,
} from "@ant-design/icons";

const Wrapper = styled.div`
  background-color: #06354f;
  top: 0;
  position: sticky;
  font-size: 14px;
  line-height: 1.42;
  .anticon{
    font-size:20px
  }
  
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: #0464AA;
    color: #fff;
    border-right: 6px solid ${theme.primaryBlue1};
  }
	

	.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected::before  {
		content: "";
    border-top: 10px solid transparent;
    border-right: 13px solid #0d90f0db;
    border-bottom: 10px solid transparent;
    position: absolute;
    margin-left: 200px;
    }

  

  & .ant-menu {
    background: #06354f;
    font-size: 13px;
    height: calc(100vh - 50px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    padding-left: 10px !important;
    width: 100%;
  }

  .ant-menu-sub {
    height: auto;
    background-color: #c4c4c417;
  }
  .ant-menu-item{
    border-bottom:dotted 1px #73717145;
  }
  .ant-menu-submenu{
    border-bottom:dotted 1px #73717145;
  }

  & .ant-menu-title-content {
    color: white;
  }

  & .ant-menu-title-content:hover {
    color: #fff;
  }

  & .ant-menu-submenu-title:hover,
  .ant-menu-item:hover {
    background: #4DADF3;
    font-weight:bold
    color: #fff;
  }

  & .ant-menu-item-selected::after {
    display: none;
  }

  & .ant-menu-item-disabled {
    background-color: #1e282c;

    & .ant-menu-title-content {
      color: ${theme.gray7};
    }
  }
`;

const SideNavHeadWrapper = styled.div`
	height: 49px;
	background: ${theme.primaryBlue};
	display: flex;
	align-items: center;
	justify-content: center;

	& > span {
		color: #fff;
		font-size: 16px;
		font-weight: 500;
		font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
	}
`;

const CircleIcon = styled.span`
	width: 10px;
	height: 10px;
	display: inline-block;
	border: 2px solid #fff;
	border-radius: 12px;
	margin-right: 10px;
`;
const SideNav = () => {
	const { t } = useTranslation();
	const router = useRouter();

	let selectKey = [];
	useEffect(() => {
		selectKey = router.pathname.split("/");
		if (selectKey[1] === "menu1-submenu1") selectKey[1] = "menu1";
	}, [router.pathname]);

	const menus = [
		{
			key: "/dashboard",
			onClick: () => router.push("/dashboard"),
			icon: <AppstoreOutlined />,
			name: t("Dashboard"),
		},
		{
			key: "/user",
			name: t("User"),
			icon: <UserOutlined className="icon" />,
			children: [
				{
					key: "/user/user-group",
					onClick: () => {
						router.push("/user/user-group");
					},
					name: t("User Group"),
					icon: <CircleIcon />,
				},
				{
					key: "/user/user-permission",
					onClick: () => {
						router.push("/user/user-permission");
					},
					name: t("User Permission"),
					icon: <CircleIcon />,
				},
			],
		},
		{
			key: "/registration",
			name: t("Registration"),
			icon: <ProfileOutlined className="icon" />,
			children: [
				{
					key: "/registration/student",
					onClick: () => {
						router.push("/registration/student");
					},
					name: t("Student"),
					icon: <CircleIcon />,
				},
				{
					key: "/registration/school",
					onClick: () => {
						router.push("/registration/school");
					},
					name: t("School"),
					icon: <CircleIcon />,
				},
			],
		},
		{
			key: "/setup",
			name: t("Setup"),
			icon: <SettingOutlined className="icon" />,
			children: [
				{
					key: "/setup/subject",
					onClick: () => {
						router.push("/setup/subject");
					},
					name: t("Subject"),
					icon: <CircleIcon />,
				},
				{
					key: "/setup/stationary",
					onClick: () => {
						router.push("/setup/stationary");
					},
					name: t("Stationery"),
					icon: <CircleIcon />,
				},
				{
					key: "/setup/dress",
					onClick: () => {
						router.push("/setup/dress");
					},
					name: t("Dress"),
					icon: <CircleIcon />,
				},
				{
					key: "/setup/facility",
					onClick: () => {
						router.push("/setup/facility");
					},
					name: t("Facility"),
					icon: <CircleIcon />,
				},
				{
					key: "/setup/activity",
					onClick: () => {
						router.push("/setup/activity");
					},
					name: t("Activities"),
					icon: <CircleIcon />,
				},
				{
					key: "/setup/hostel",
					onClick: () => {
						router.push("/setup/hostel");
					},
					name: t("Hostel"),
					icon: <CircleIcon />,
				},
				{
					key: "/setup/house",
					onClick: () => {
						router.push("/setup/house");
					},
					name: t("House"),
					icon: <CircleIcon />,
				},
			],
		},
	];

	return (
		<Wrapper>
			<SideNavHeadWrapper>
				<span>{t("School Management System")}</span>
			</SideNavHeadWrapper>
			<MenuGenerator
				mode={"inline"}
				items={menus}
				selectedKeys={[router.pathname]}
				expandIcon={(props) =>
					props.isOpen ? (
						<DownOutlined
							style={{ color: "#fff", fontSize: "10px", fontWeight: "bold" }}
						/>
					) : (
						<LeftOutlined
							style={{ color: "#fff", fontSize: "10px", fontWeight: "bold" }}
						/>
					)
				}
			/>
		</Wrapper>
	);
};

export { SideNav };
