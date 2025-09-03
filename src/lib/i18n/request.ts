import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !routing.locales.includes(locale as any)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: {
			common: (await import(`../../server/dictionary/${locale}/common.json`))
				.default,
			components: (
				await import(`../../server/dictionary/${locale}/components.json`)
			).default,
			messages_status: (
				await import(`../../server/dictionary/${locale}/messages_status.json`)
			).default,
			pages: (await import(`../../server/dictionary/${locale}/pages.json`))
				.default,
			validation: (
				await import(`../../server/dictionary/${locale}/validation.json`)
			).default,
		},
	};
});
