"use client";

import { useId, useState, useMemo } from "react";
import { EyeIcon, EyeClosed, CheckIcon, EyeOffIcon, XIcon } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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

export function InputPasswordStrength({
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	const id = useId();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const c = useTranslations("components.Inputs.password");

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const checkStrength = (pass: string) => {
		const requirements = [
			{ regex: /.{8,}/, text: c("validations.min-caracteres", { min: 8 }) },
			{ regex: /[0-9]/, text: c("validations.min-number", { min: 1 }) },
			{ regex: /[a-z]/, text: c("validations.min-lowercase", { min: 1 }) },
			{ regex: /[A-Z]/, text: c("validations.min-uppercase", { min: 1 }) },
		];

		return requirements.map((req) => ({
			met: req.regex.test(pass),
			text: req.text,
		}));
	};

	const strength = checkStrength(props.value);

	const strengthScore = useMemo(() => {
		return strength.filter((req) => req.met).length;
	}, [strength]);

	const getStrengthColor = (score: number) => {
		console.log(score);
		if (score === 0) return "bg-border";
		if (score <= 1) return "bg-destructive";
		if (score <= 2) return "bg-warning";
		if (score === 3) return "bg-caution";
		return "bg-primary";
	};

	const getStrengthText = (score: number) => {
		if (score === 0) return;
		if (score <= 2) return c("validations.feedback-password-min");
		if (score === 3) return c("validations.feedback-password-med");
		return c("validations.feedback-password-large");
	};

	return (
		<div>
			{/* Password input field with toggle visibility button */}
			<div className="*:not-first:mt-2">
				<div className="relative">
					<Input
						id={id}
						className={cn("pe-9", className)}
						{...props}
						type={isVisible ? "text" : "password"}
						aria-describedby={`${id}-description`}
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

			{/* Password strength indicator */}
			<div
				className="mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border"
				role="progressbar"
				aria-valuenow={strengthScore}
				aria-valuemin={0}
				aria-valuemax={4}
				aria-label="Password strength"
			>
				<div
					className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
					style={{ width: `${(strengthScore / 4) * 100}%` }}
				></div>
			</div>

			{/* Password strength description */}
			<p
				id={`${id}-description`}
				className="mb-2 font-medium text-foreground text-sm"
			>
				{getStrengthText(strengthScore)} {c("validations.help-message")}
			</p>

			{/* Password requirements list */}
			<ul className="space-y-1.5" aria-label="Password requirements">
				{strength.map((req, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<li key={index} className="flex items-center gap-2">
						{req.met ? (
							<CheckIcon
								size={16}
								className="text-primary"
								aria-hidden="true"
							/>
						) : (
							<XIcon
								size={16}
								className="text-muted-foreground/80"
								aria-hidden="true"
							/>
						)}
						<span
							className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
						>
							{req.text}
							<span className="sr-only">
								{req.met ? " - Requirement met" : " - Requirement not met"}
							</span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
