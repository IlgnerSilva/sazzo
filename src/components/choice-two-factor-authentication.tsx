import { useState } from "react";
import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
} from "./kibo-ui/choicebox";
import { motion } from "motion/react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function ChoiceTwoFactorAuthentication() {
  const [typeTwoFactor, setTypeTwoFactor] = useState<"OTP" | "TOTP" | null>(
    null,
  );
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4">
        <div>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              Two Factor
            </CardTitle>
          </CardHeader>
          <Choicebox onValueChange={setTypeTwoFactor} value={typeTwoFactor}>
            <ChoiceboxItem key={1} value="opt">
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>
                  Via Email
                </ChoiceboxItemTitle>
              </ChoiceboxItemHeader>
              <ChoiceboxIndicator />
            </ChoiceboxItem>
            <ChoiceboxItem key={2} value="totp">
            <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>
                  Via App 
                </ChoiceboxItemTitle>
              </ChoiceboxItemHeader>
              <ChoiceboxIndicator />
            </ChoiceboxItem>
          </Choicebox>
        </div>
        <Button loading={true}>Continue</Button>
      </Card>
    </motion.div>
  );
}
