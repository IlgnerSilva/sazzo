import common from "@/dictionary/pt-br/common.json";
import components from "@/dictionary/pt-br/components.json";
import messages_status from "@/dictionary/pt-br/messages_status.json";
import pages from "@/dictionary/pt-br/pages.json";
import validation from "@/dictionary/pt-br/validation.json";

export const messages = {
	pages,
	common,
	validation,
	messages_status,
	components,
} as const;

type Messages = typeof messages;

declare module "next-intl" {
	interface AppConfig {
		Messages: Messages;
	}
}
