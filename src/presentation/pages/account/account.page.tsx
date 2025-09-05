import { Tab } from "@/presentation/components/common/navigation/tabs/tab";
import { FormLoginCredentials } from "@/presentation/components/feature/auth/components/form-login-credentials";

export async function PageAccount() {
	const tabs = [
		{
			id: "TESTE",
			title: "TESTE",
			color: "bg-amber-500 hover:bg-amber-600",
			cardContent: <div className="relative h-full" />,
		},
	];

	return <Tab items={tabs} />;
}
