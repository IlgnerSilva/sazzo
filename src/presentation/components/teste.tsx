import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
} from "@/presentation/components/ui/table";

export async function Teste() {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	const { users } = await auth.api.listUsers({
		query: {
			limit: 10,
		},
		headers: await headers(),
	});

	return (
		<div>
			<pre>{JSON.stringify(users, null, 2)}</pre>
		</div>
		// <Table>
		// 	<TableHeader>
		// 		<TableHead>Nome</TableHead>
		// 		<TableHead>Email</TableHead>
		// 		<TableHead>Perfil</TableHead>
		// 	</TableHeader>
		// 	<TableBody>
		// 		{users.map((user) => (
		// 			<TableRow key={user.id}>
		// 				<TableCell>{user.name}</TableCell>
		// 				<TableCell>{user.email}</TableCell>
		// 				<TableCell>{user.role}</TableCell>
		// 			</TableRow>
		// 		))}
		// 	</TableBody>
		// </Table>
	);
}
