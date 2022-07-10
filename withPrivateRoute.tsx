import React, { useEffect } from "react";
import { useRouter } from "next/router";

const PrivateRoute = (AuthComponent) => {
	function PrivateComponent({ children }) {
		const router = useRouter();
		useEffect(() => {
			router.push("/login");
		}, []);

		return <>{children} </>;
	}

	return class Higher extends React.Component {
		render() {
			return (
				<PrivateComponent>
					<AuthComponent {...this.props} />
				</PrivateComponent>
			);
		}
	};
};

export default PrivateRoute;
