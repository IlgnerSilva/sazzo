import { useTranslations } from "next-intl";

export const useMessageTranslation = () => {
	const t = useTranslations("messages_status");

	const translateMessage = (messageCode: string, fallback = null) => {
		try {
			const translation = t(messageCode as any);
			return translation !== messageCode
				? translation
				: fallback || messageCode;
		} catch (e) {
			return fallback || messageCode;
		}
	};

	const translateApiResponse = (apiResponse: { code: string }) => {
		return {
			...apiResponse,
			translatedMessage: translateMessage(apiResponse.code),
		};
	};

	return { translateMessage, translateApiResponse };
};
