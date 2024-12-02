import { IconName } from "../components/common/Icon";

export interface Transaction {
  id: string;
  icon: IconName;
  description: string;
  type: "deposit-card" | "deposit-paypal" | "transfer";
  date: string;
  amount: number;
}
