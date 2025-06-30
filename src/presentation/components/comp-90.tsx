import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { useTranslations } from "next-intl";

export function Component() {
	const c = useTranslations("errors");
	return (
		<Button disabled>
			<LoaderCircleIcon
				className="-ms-1 animate-spin"
				size={16}
				aria-hidden="true"
			/>
		</Button>
	);
}
