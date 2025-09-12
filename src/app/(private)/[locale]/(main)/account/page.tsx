import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { AccountPage } from "@/presentation/pages/account/account.page";

export default async function Page() {
	return (
		<Suspense fallback={<Loader2 className="animate-spin" />}>
			<AccountPage />
		</Suspense>
	);
}
