import { Teste } from "@/presentation/components/teste";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function Page() {
	return (
		<Suspense fallback={<Loader2 className="animate-spin" />}>
			<Teste />
		</Suspense>
	);
}
