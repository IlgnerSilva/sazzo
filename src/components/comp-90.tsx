import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Component() {
	const c = useTranslations("components.Button");
	return (
		<Button disabled>
			<LoaderCircleIcon
				className="-ms-1 animate-spin"
				size={16}
				aria-hidden="true"
			/>
			{c("login")}
		</Button>
	);
}
