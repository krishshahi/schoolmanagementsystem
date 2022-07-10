import { Result } from "antd";
import { FC } from "react";

interface Props {
	message?: string;
}

const PageNotFound: FC<Props> = ({ message }) => {
	return (
		<Result
			status={"404"}
			title={"404"}
			subTitle={message || "Sorry, the page you visited does not exist."}
		/>
	);
};

export default PageNotFound;
