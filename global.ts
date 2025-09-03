import common from "@/server/dictionary/pt-br/common.json";
import components from "@/server/dictionary/pt-br/components.json";
import messages_status from "@/server/dictionary/pt-br/messages_status.json";
import pages from "@/server/dictionary/pt-br/pages.json";
import validation from "@/server/dictionary/pt-br/validation.json";

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
