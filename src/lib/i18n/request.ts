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
			common: (await import(`../../dictionary/${locale}/common.json`)).default,
			components: (await import(`../../dictionary/${locale}/components.json`))
				.default,
			errors: (await import(`../../dictionary/${locale}/errors.json`)).default,
			pages: (await import(`../../dictionary/${locale}/pages.json`)).default,
			validation: (await import(`../../dictionary/${locale}/validation.json`))
				.default,
		},
	};
});
