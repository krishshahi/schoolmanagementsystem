import { useTranslation } from "react-i18next";
const Api = () => {
	const { t } = useTranslation();

	return (
		<>
			<h6>{t("Hello s")}</h6>
		</>
	);
};

export default Api;
