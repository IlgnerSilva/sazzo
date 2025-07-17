import common from "@/dictionary/pt-br/common.json";
import components from "@/dictionary/pt-br/components.json";
import messageStaus from "@/dictionary/pt-br/messageStaus.json";
import pages from "@/dictionary/pt-br/pages.json";
import validation from "@/dictionary/pt-br/validation.json";

export const dictionary = {
	pages,
	common,
	validation,
	messageStaus,
	components,
} as const;

export type Messages = typeof dictionary;
