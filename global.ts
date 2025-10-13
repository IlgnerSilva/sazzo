import type { Messages } from "@/lib/i18n/types";

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}
