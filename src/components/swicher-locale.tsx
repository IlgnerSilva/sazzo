"use client";
import { usePathname as usePath, useRouter } from "next/navigation";
import { useId } from "react";
import { UISelect } from "@/components/ui";
import { locales, usePathname } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

export function SwitcherLocale({
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLSelectElement>) {
	const id = useId();
	const pathname = usePathname(); // Defina dentro do componente de função
	const router = useRouter();
	const getLocale = usePath().split("/")[1].toUpperCase();

	const languages = [
		{ value: "en", label: "EN", flag: "fi fi-us" },
		{
			value: "pt-br",
			label: "PT-BR",
			flag: "fi fi-br",
		},
	];

	const validLanguages = locales
		.map((locale) => languages.find((language) => language.value === locale))
		.filter(Boolean) as { value: string; label: string; flag: string }[];

	const handleLocaleChange = (locale: string) => {
		// Mude o caminho para incluir o novo locale
		const href = `/${locale}${pathname}`;
		router.push(href);
	};

	return (
		<div className={cn("rounded-md *:not-first:mt-2", className)}>
			<UISelect.Select
				onValueChange={(e) => {
					handleLocaleChange(e);
				}}
			>
				<UISelect.SelectTrigger
					className="max-w-max [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
					id={id}
				>
					<UISelect.SelectValue
						className="max-w-max placeholder:flex placeholder:items-center placeholder:gap-2 placeholder:text-lg placeholder:text-muted-foreground/80"
						placeholder={
							<>
								<span
									className={
										languages.find((language) => {
											if (language.value.toUpperCase() === getLocale) {
												return language;
											} else {
												return false;
											}
										})?.flag
									}
								/>
								<span>
									{languages
										.find((language) => {
											if (language.value.toUpperCase() === getLocale) {
												return language;
											} else {
												return false;
											}
										})
										?.value.toUpperCase()}
								</span>
							</>
						}
					/>
				</UISelect.SelectTrigger>
				<UISelect.SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
					{validLanguages.map((language) => {
						return (
							<UISelect.SelectItem
								className="flex items-center gap-1"
								key={language?.value}
								value={language.value}
							>
								<span className="leading-none">
									<span className={language.flag} /> {language.label}
								</span>
							</UISelect.SelectItem>
						);
					})}
				</UISelect.SelectContent>
			</UISelect.Select>
		</div>
	);
}
