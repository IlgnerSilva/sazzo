import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
	return (
		<div className="flex max-h-screen flex-1 items-center justify-center">
			<div className="h-full w-full max-w-xs">
				<LoginForm />
			</div>
		</div>
	);
}
