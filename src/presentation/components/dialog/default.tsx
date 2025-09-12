import { zodResolver } from "@hookform/resolvers/zod";
import { useDirection } from "@radix-ui/react-direction";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
	Alert,
	AlertIcon,
	AlertTitle,
} from "@/presentation/components/ui/alert";
import { Button } from "@/presentation/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/presentation/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/presentation/components/ui/form";
import { Textarea } from "@/presentation/components/ui/textarea";

export default function DialogDemo() {
	const [open, setOpen] = useState(false);
	const direction = useDirection();

	const FormSchema = z.object({
		feedback: z
			.string()
			.min(1, "Feedback is required")
			.max(200, "Feedback cannot exceed 200 characters"),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { feedback: "" },
		mode: "onSubmit",
	});

	function onSubmit() {
		toast.custom((t) => (
			<Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
				<AlertIcon>
					<RiCheckboxCircleFill />
				</AlertIcon>
				<AlertTitle>Your feedback successfully submitted</AlertTitle>
			</Alert>
		));

		form.reset();
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Show Dialog</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md" dir={direction}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Suggest Idea</DialogTitle>
							<DialogDescription>Describe your suggestion.</DialogDescription>
						</DialogHeader>
						<DialogBody>
							<FormField
								control={form.control}
								name="feedback"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												placeholder="Tell us how we can improve our product"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Please don’t include any sensitive information
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</DialogBody>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Close
								</Button>
							</DialogClose>
							<Button type="submit">Submit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
