import common from "./dictionary/pt-br/common.json";
import components from "./dictionary/pt-br/components.json";
import messages_status from "./dictionary/pt-br/messages_status.json";
import pages from "./dictionary/pt-br/pages.json";
import zod from "./dictionary/pt-br/zod.json";

export const dictionary = {
	pages,
	common,
	zod,
	messages_status,
	components,
} as const;

export type Messages = typeof dictionary;
