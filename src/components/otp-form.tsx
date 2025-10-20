import { UIButton, UICard, UIField, UIInputOTP } from "@/components/ui";

export function OTPForm({
	...props
}: React.ComponentProps<typeof UICard.Card>) {
	return (
		<UICard.Card {...props}>
			<UICard.CardHeader>
				<UICard.CardTitle>Enter verification code</UICard.CardTitle>
				<UICard.CardDescription>
					We sent a 6-digit code to your email.
				</UICard.CardDescription>
			</UICard.CardHeader>
			<UICard.CardContent>
				<form>
					<UIField.FieldGroup>
						<UIField.Field>
							<UIField.FieldLabel htmlFor="otp">
								Verification code
							</UIField.FieldLabel>
							<UIInputOTP.InputOTP id="otp" maxLength={6} required>
								<UIInputOTP.InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
									<UIInputOTP.InputOTPSlot index={0} />
									<UIInputOTP.InputOTPSlot index={1} />
									<UIInputOTP.InputOTPSlot index={2} />
									<UIInputOTP.InputOTPSlot index={3} />
									<UIInputOTP.InputOTPSlot index={4} />
									<UIInputOTP.InputOTPSlot index={5} />
								</UIInputOTP.InputOTPGroup>
							</UIInputOTP.InputOTP>
							<UIField.FieldDescription>
								Enter the 6-digit code sent to your email.
							</UIField.FieldDescription>
						</UIField.Field>
						<UIField.FieldGroup>
							<UIButton.Button type="submit">Verify</UIButton.Button>
							{/*<FieldDescription className="text-center">
                Didn&apos;t receive the code? <a href="#">Resend</a>
              </FieldDescription>*/}
						</UIField.FieldGroup>
					</UIField.FieldGroup>
				</form>
			</UICard.CardContent>
		</UICard.Card>
	);
}
