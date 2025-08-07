"use client";
import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/presentation/components/ui/breadcrumb";
import { useId } from "react";
import { House } from "lucide-react";
import { useTranslations } from "next-intl";

export function AutoBreadcrumb() {
	const pathname = usePathname();
	const id = useId();
	const t = useTranslations("common.pathname");

	// Converte '/produtos/eletronicos/smartphones' em:
	// [{ label: 'Produtos', href: '/produtos' }, ...]
	const pathSegments = pathname.split("/").filter(Boolean);

	const breadcrumbs = pathSegments.map((segment, index) => {
		const href = "/" + pathSegments.slice(0, index + 1).join("/");
		const isLast = index === pathSegments.length - 1;

		return {
			label: segment.charAt(0).toUpperCase() + segment.slice(1),
			href: isLast ? undefined : href,
		};
	});

	return (
		<Breadcrumb>
			{breadcrumbs.length > 1 && (
				<BreadcrumbList key={id}>
					{breadcrumbs.map((breadcrumb, item) => (
						<div className="flex items-center gap-2" key={item}>
							<BreadcrumbItem>
								<BreadcrumbLink
									className={
										breadcrumbs.length - 1 === item ? "text-foreground" : ""
									}
									href={breadcrumb.href}
								>
									{item === 0 ? (
										<House className="h-4 w-4" />
									) : (
										t(breadcrumb.label.toLocaleLowerCase() + ".root")
									)}
								</BreadcrumbLink>
							</BreadcrumbItem>
							{item < breadcrumbs.length - 1 && (
								<BreadcrumbSeparator className="hidden md:block" />
							)}
						</div>
					))}
				</BreadcrumbList>
			)}
		</Breadcrumb>
	);
}
