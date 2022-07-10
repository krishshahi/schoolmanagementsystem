import { i18next } from "../../../i18n";
import { Button } from "antd";
import { useState } from "react";
const Translation = () => {
	const [lang, setLang] = useState("en");
	const changeLanguage = (lng) => {
		i18next.changeLanguage(lng);
		setLang(lng);
	};
	return (
		<div>
			<Button
				onClick={() => changeLanguage(i18next.language === "en" ? "np" : "en")}
			>
				{localStorage.getItem("i18nextLng") === "en" ? "Nepali" : "English"}
			</Button>
		</div>
	);
};

export { Translation };
