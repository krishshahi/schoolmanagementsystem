import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { ReactNode } from "react";
import { theme } from "../../../theme";
import styled from "styled-components";
import { Loader } from "../loader";

type ButtonType = "primary" | "link" | "default";
export interface ButtonProps {
	children?: React.ReactNode;
	htmlType?: "button" | "submit" | "reset";
	type?: ButtonType;
	width?: string;
	height?: string;
	block?: boolean;
	padding?: string;
	loading?: boolean;
	disabled?: boolean;
	icon?: ReactNode;
	minheight?: number;
	minwidth?: number;
	boxshadow?: string;
	background?: string;
	borderradius?: string;
	noradius?: boolean;
	typography?: any;
	color?: string;
	fontSize?: string;
	bold?: boolean;
	margin?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	bordercolor?: string;
	wrapperClassName?: string;
	buttonClassName?: string;
	hovercolor?: string;
	activecolor?: string;
}
const Wrapper = styled.div`
	display: contents;

	& .ant-btn-link {
		box-shadow: none;
		background: transparent;
		color: ${theme.blue2};
	}
`;
const StyledButton = styled(Button)<ButtonProps>`
	${({ typography }: ButtonProps) => {
		if (typography) {
			return typography;
		}
	}}
	&[disabled] {
		background-color: ${theme.secondaryLight};
		border: none;
		box-shadow: none !important;
		color: ${theme.base};
	}

	border-color: ${({ bordercolor }: ButtonProps) => {
		return bordercolor ? bordercolor : "";
	}};
	border-radius: ${({ borderradius, noradius }: ButtonProps) => {
		return noradius ? "none" : borderradius ? borderradius : "0px";
	}};
	margin: ${({ margin }: ButtonProps) => {
		return margin && margin;
	}};
	padding: ${({ type, padding }: ButtonProps) => {
		if (padding) {
			return `${padding} !important`;
		}
	}};

	background: ${({ background }: ButtonProps) => {
		return background ? background : "";
	}};

	color: ${({ color }: ButtonProps) => {
		return color ? `${color} !important` : theme.base;
	}};
	font-size: ${({ fontSize }: ButtonProps) => {
		return fontSize && fontSize;
	}};
	font-weight: ${({ bold }: ButtonProps) => {
		return bold && "bold";
	}};
	min-width: ${({ minwidth }: ButtonProps) => {
		return minwidth && `${minwidth}px`;
	}};
	width: ${({ width }: ButtonProps) => {
		return width && `${width}`;
	}};
	height: ${({ height }: ButtonProps) => {
		return height && `${height}`;
	}};
	cursor: pointer;
	min-height: ${({ minheight }: ButtonProps) => {
		return minheight && `${minheight}px`;
	}};

	& :hover {
		background-color: ${({ hovercolor }: ButtonProps) => {
			return hovercolor ?? "";
		}};
		color: "white";
		border-color: transparent;
	}

	& :active,
	:focus {
		background-color: ${({ activecolor }: ButtonProps) => {
			return activecolor ?? "";
		}};
		color: "white";
		border-color: transparent;
	}
`;

export const ButtonComponent: React.FC<ButtonProps> = ({
	children,
	htmlType,
	loading,
	onClick,
	wrapperClassName,
	buttonClassName,
	hovercolor,
	icon,
	...rest
}) => {
	return (
		<Wrapper {...rest} className={wrapperClassName ?? ""}>
			<StyledButton
				onClick={onClick}
				htmlType={htmlType}
				loading={loading}
				hovercolor={hovercolor}
				icon={icon}
				{...rest}
				className={buttonClassName ?? ""}
			>
				{!loading ? children : <Loader />}
			</StyledButton>
		</Wrapper>
	);
};
