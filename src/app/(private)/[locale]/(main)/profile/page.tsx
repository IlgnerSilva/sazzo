import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { PageProfile } from "@/presentation/pages/profile/profile.page";

export default async function Page() {
	return (
		<Suspense fallback={<Loader2 className="animate-spin" />}>
			<PageProfile />
		</Suspense>
	);
}
