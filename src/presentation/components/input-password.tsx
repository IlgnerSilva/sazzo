"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeClosed } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/lib/utils";

export function InputPassword({
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	const id = useId();
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	return (
		<div className="*:not-first:mt-2">
			<div className="relative">
				<Input
					id={id}
					className={cn("pe-9", className)}
					{...props}
					type={isVisible ? "text" : "password"}
				/>
				<button
					className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					type="button"
					onClick={toggleVisibility}
					aria-label={isVisible ? "Hide password" : "Show password"}
					aria-pressed={isVisible}
					aria-controls="password"
				>
					{isVisible ? (
						<EyeIcon size={16} aria-hidden="true" />
					) : (
						<EyeClosed size={16} aria-hidden="true" />
					)}
				</button>
			</div>
		</div>
	);
}
