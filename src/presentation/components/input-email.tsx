import { MailIcon } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";

export function InputEmail(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className="*:not-first:mt-2">
			<div className="relative">
				<Input className="peer pe-9" {...props} />
				<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
					<MailIcon size={16} aria-hidden="true" />
				</div>
			</div>
		</div>
	);
}
