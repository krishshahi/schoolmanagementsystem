import { useTranslation } from "react-i18next";
import { Steps, message } from "antd";
import { ButtonComponent as Button } from "../button";
import { useState } from "react";
import styled from "styled-components";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
const { Step } = Steps;

const Container = styled.div`
	.ant-steps-item-finish .ant-steps-item-icon {
		background-color: #499835;
		border-color: #499835;
	}
	.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
		color: white;
	}
	.steps-action {
		float: right;
	}
	.steps-content {
		min-height: 200px;
		margin-top: 16px;
		padding: 15px;
		background-color: #fafafa;
		border: 1px dashed #e9e9e9;
		border-radius: 2px;
	}

	.steps-action {
		margin-top: 24px;
	}
	.button {
		margin-right: 5px;
		background-color: white;
		color: #000000d9;
		border-color: #d9d9d9;
	}
	.button-wrapper {
		& :hover {
			color: #1890ff;
		}
	}
`;

interface StepProps {
	steps: Item[];
}

interface Item {
	title: string;
	content: any;
}
const MultiSteps: React.FC<StepProps> = ({ steps }) => {
	const { t } = useTranslation();
	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	return (
		<>
			<Container>
				<Steps current={current}>
					{steps.map((item) => (
						<Step key={item.title} title={item.title} />
					))}
				</Steps>
				<div className="steps-content">{steps[current].content}</div>
				<div className="steps-action">
					{current > 0 && (
						<Button
							type="primary"
							icon={<LeftOutlined />}
							onClick={() => prev()}
							buttonClassName={"button"}
							wrapperClassName={"button-wrapper"}
							padding="5px"
						>
							{t("Back")}
						</Button>
					)}
					{current < steps.length - 1 && (
						<Button
							type="primary"
							icon={<RightOutlined />}
							onClick={() => next()}
						>
							{t("Next")}
						</Button>
					)}
					{current === steps.length - 1 && (
						<Button
							type="primary"
							onClick={() => message.success("Processing complete!")}
						>
							{t("Done")}
						</Button>
					)}
				</div>
			</Container>
		</>
	);
};

export { MultiSteps };
