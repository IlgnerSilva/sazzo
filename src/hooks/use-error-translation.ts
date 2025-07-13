import { useTranslations } from "next-intl";

export const useErrorTranslation = () => {
	const t = useTranslations("errors");

	const translateError = (errorCode, fallback = null) => {
		try {
			const translation = t(errorCode);
			return translation !== errorCode ? translation : fallback || errorCode;
		} catch (e) {
			return fallback || errorCode;
		}
	};

	const translateApiResponse = (apiResponse) => {
		return {
			...apiResponse,
			translatedMessage: translateError(apiResponse.code),
		};
	};

	return { translateError, translateApiResponse };
};
