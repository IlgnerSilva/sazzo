import { Teste } from "@/presentation/components/teste";
import { Suspense } from "react";
export default function Page() {
	return (
		<Suspense fallback={<div>Carregando...</div>}>
			<Teste />
		</Suspense>
	);
}
