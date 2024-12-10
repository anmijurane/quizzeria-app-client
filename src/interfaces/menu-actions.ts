import { To } from "react-router-dom";

export interface MenuActions {
  label: string;
  secondaryLabel?: string;
  disable?: boolean;
  to?: To;
  toAction?: () => void;
}

