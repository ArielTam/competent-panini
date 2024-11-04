import styled from "@emotion/styled";
import {
  Button,
  CenteredVStack,
  Divider,
  Spacer,
  VStack,
} from "../../../../components/buildingBlocks";
import { CompanyLogo } from "../../../../components/CompanyLogo";
import { PlusIcon } from "../../../../components/icons/PlusIcon";

const CompanyHeader = styled(CenteredVStack)({
  marginTop: 77,
});

const CompanyByline = styled("div")({
  width: 257,
  fontSize: 16,
  textAlign: "center",
});

const NoAccounts = styled(VStack)({
  width: "auto",
  margin: `68px 30px`,
  fontSize: 20,
});

const NoAccountsTitle = styled("div")({
  fontWeight: 700,
  fontSize: 24,
});

const NoAccountsBody = styled("div")({
  fontSize: 20,
  marginBottom: 68,
});

const AddButton = styled(Button)({
  height: 48,
  fontSize: 20,

  svg: {
    scale: 1.2,
  },
});

export const EmptyState = () => {
  return (
    <VStack>
      <CompanyHeader>
        <CompanyLogo />
        <CompanyByline>
          Welcome to a new way to manage your businesses’ finances.
        </CompanyByline>
      </CompanyHeader>
      <NoAccounts>
        <NoAccountsTitle>Get started</NoAccountsTitle>
        <NoAccountsBody>
          Add your rate confirmation and bill of lading and our team will
          invoice your customers on your behalf.
        </NoAccountsBody>
        <AddButton>
          <Spacer>
            <PlusIcon />
            Add
          </Spacer>
        </AddButton>
        <Divider />
        Your balance is zero at the moment, but don’t worry that’ll change soon.
      </NoAccounts>
    </VStack>
  );
};
