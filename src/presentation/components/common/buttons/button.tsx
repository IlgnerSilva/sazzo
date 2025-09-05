import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UIButton } from "@/presentation/components/ui";

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
		<UIButton.Button
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
		</UIButton.Button>
	);
}
