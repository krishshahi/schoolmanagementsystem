import React from "react";

const RestrictedRoute = (AuthComponent) => {
	function RestrictedComponent({ children }) {
		return <>{children}</>;
	}

	return class Higher extends React.Component {
		render() {
			return (
				<RestrictedComponent>
					<AuthComponent {...this.props} />
				</RestrictedComponent>
			);
		}
	};
};

export default RestrictedRoute;
