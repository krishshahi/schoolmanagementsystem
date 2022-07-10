import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useMemo, useState } from "react";
import { GlobalStyle } from "../utils/global-style";
import "../utils/css-imports";
import { Layout } from "antd";
import styled from "styled-components";
import { theme } from "../theme";
import { Translation, SideNav, useWindowSize } from "../components";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Sider, Content } = Layout;

const Aside = styled(Sider)`
	/* position: fixed; */
`;

const LayoutWrapper = styled.div`
	width: 100%;

	& .ant-layout-header {
		height: 64px;
		padding: 0 50px;
		color: rgba(0, 0, 0, 0.85);
		background: #ffffff;
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
	}

	& .ant-layout-content {
		min-height: 92vh;
		padding: 10px 25px;
	}

	& .ant-layout-footer {
		padding-top: 0;
	}
	.content {
		background: white;
		height: calc(100vh - 150px);
		padding: 10px;
	}
	@media only screen and (max-width: 768px) {
		& .content {
			width: 100%;
			height: calc(100vh - 100px);
			margin-left: 0px;
			position: relative;
		}
		& .ant-layout-content {
			padding: 40px 25px;
		}
	}
`;

const ContentTop = styled.div`
	width: 100%;
	height: 50px;
	background: ${theme.primaryBlue1};
	z-index: 999;
	top: 0;
	display: flex;
	align-items: center;
	position: sticky;

	& .wrapper {
		display: flex;
		min-width: 100%;
		justify-content: flex-end;

		& .user-name {
			line-height: 20px;
			padding: 3px 17px 4px 4px;
			color: white;
		}

		& .user-name:hover {
			cursor: pointer;
		}
	}

	@media (max-width: 768px) {
		& .wrapper {
			display: none;
		}
		& .content {
			background: white;
			height: calc(100vh - 100px);
			width: 100%;
		}
	}
`;

function MyApp({ Component, pageProps }: AppProps) {
	const windowSize = useWindowSize();
	const [mounted, setMounted] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	const routers = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);
	const restrictedRoute = useMemo(() => ["/", "/login"], []);
	return (
		<div>
			{mounted && (
				<>
					<GlobalStyle />
					{!restrictedRoute.includes(routers.pathname) ? (
						<Layout>
							<Aside
								trigger={null}
								collapsed={windowSize.width <= 768 && !showSidebar}
								collapsedWidth={0}
								width={windowSize.width >= 2000 ? 300 : 230}
							>
								<SideNav />
							</Aside>
							<LayoutWrapper>
								<ContentTop>
									<MenuOutlined
										style={{
											color: "#fff",
											display: windowSize.width <= 768 ? "unset" : "none",
											marginLeft: 10,
											fontSize: 20,
										}}
										onClick={() => setShowSidebar(!showSidebar)}
									/>
									<div className={"wrapper"}>
										<span className={"user-name"}>
											<Translation />
										</span>
									</div>
								</ContentTop>
								<Content>
									<Component {...pageProps} />
								</Content>
							</LayoutWrapper>
						</Layout>
					) : (
						<Component {...pageProps} />
					)}
				</>
			)}
		</div>
	);
}

export default MyApp;
