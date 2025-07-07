import { LoaderCircleIcon } from "lucide-react";
import { Button as ButtonUI } from "@/presentation/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	isLoading?: boolean;
	variant: "default" | "secondary";
};

export function Button({
	className,
	children,
	isLoading,
	variant,
	...props
}: ButtonProps) {
	return (
		<ButtonUI
			variant={variant}
			disabled={isLoading}
			className={cn("", className)}
			{...props}
		>
			{isLoading && (
				<LoaderCircleIcon
					className="-ms-1 animate-spin"
					size={16}
					aria-hidden="true"
				/>
			)}
			{children}
		</ButtonUI>
	);
}
