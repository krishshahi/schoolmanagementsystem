import React from "react";
import { Spin } from "antd";

interface Props {
	size?: "small" | "large" | "default";
	text?: string;
	indicator?: any;
}

const Loader: React.FC<Props> = (props) => {
	return <Spin {...props} />;
};

export { Loader };
