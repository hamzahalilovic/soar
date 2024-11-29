import React from "react";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as AccountsIcon } from "../../assets/icons/accounts.svg";
import { ReactComponent as CreditCardsIcon } from "../../assets/icons/credit-cards.svg";
import { ReactComponent as InvestmentsIcon } from "../../assets/icons/investments.svg";
import { ReactComponent as MyPrivilegesIcon } from "../../assets/icons/my-privileges.svg";
import { ReactComponent as TransactionsIcon } from "../../assets/icons/transactions.svg";
import { ReactComponent as LoansIcon } from "../../assets/icons/loans.svg";
import { ReactComponent as ServicesIcon } from "../../assets/icons/services.svg";
import { ReactComponent as SettingsOutlineIcon } from "../../assets/icons/settings-outline.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icons/notification.svg";

const iconRegistry = {
  dashboard: DashboardIcon,
  settings: SettingsIcon,
  logo: LogoIcon,
  accounts: AccountsIcon,
  creditcards: CreditCardsIcon,
  investments: InvestmentsIcon,
  myprivileges: MyPrivilegesIcon,
  transactions: TransactionsIcon,
  loans: LoansIcon,
  services: ServicesIcon,
  settingsOutline: SettingsOutlineIcon,
  search: SearchIcon,
  notification: NotificationIcon,
};

export type IconName = keyof typeof iconRegistry;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = "inherit" }) => {
  const SvgIcon = iconRegistry[name];
  return <SvgIcon width={size} height={size} style={{ fill: color }} />;
};

export default Icon;
