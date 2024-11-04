import styled from "@emotion/styled";
import { CenteredVStack, HStack } from "../buildingBlocks";
import { BalanceIcon } from "../icons/BalanceIcon";
import { InvoiceIcon } from "../icons/InvoiceIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { colors } from "../../constants";

const StickyNav = styled(HStack)({
  position: "sticky",
  justifyContent: "space-around",
  margin: 4,
  boxShadow: `0px -4px 2px 0px #0000000F`,
});

const NavItem = styled(CenteredVStack)(
  ({ isActive }: { isActive?: boolean }) => ({
    margin: `12px 0`,
    ...(!isActive && {
      color: colors.type.tertiary,
    }),
  })
);

export const NavBar = () => (
  <StickyNav>
    <NavItem isActive>
      <BalanceIcon isActive />
      Balances
    </NavItem>
    <NavItem>
      <InvoiceIcon />
      Invoice
    </NavItem>
    <NavItem>
      <ProfileIcon />
      Profile
    </NavItem>
  </StickyNav>
);
