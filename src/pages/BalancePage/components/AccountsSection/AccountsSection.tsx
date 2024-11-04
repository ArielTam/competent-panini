import styled from "@emotion/styled";
import { useMemo, useState, useEffect } from "react";
import {
  Button,
  HStack,
  Spacer,
  VStack,
} from "../../../../components/buildingBlocks";
import { BalanceHighlightIcon } from "../../../../components/icons/BalanceHighlightIcon";
import { getDollarString } from "../../../../helpers";
import { Account, AcctType } from "../../../../sharedTypes";
import { TotalBalance } from "./components/TotalBalance";

const AccountList = styled(VStack)({
  border: `1px solid #83817E`,
  borderRadius: 4,
  margin: `0 23px`,
});

const AccountListItem = styled("div")(
  ({ isSelected }: { isSelected: boolean }) => ({
    borderRadius: 4,
    ...(isSelected && { border: `2px solid #114A32` }),
  })
);

const AccountPreview = styled(VStack)(
  ({ isDisabled }: { isDisabled?: boolean }) => ({
    position: "relative" as const,
    padding: `21px 31px`,
    borderBottom: `1px solid #83817E`,

    ":last-of-type": {
      border: "none", // fix this
    },

    ...(isDisabled && {
      opacity: 0.7,
    }),
  })
);

const AccountBalance = styled("div")({
  fontSize: 20,
  fontWeight: 700,
  color: `#010700`,
});

const AccountType = styled("div")({
  fontWeight: 500,
  color: `#010700`,
});

const LABEL_WIDTH = 240;

const FundingTransactionsLabel = styled(HStack)({
  position: "absolute",
  top: -14,
  left: `calc(50% - ${LABEL_WIDTH / 2}px)`,
  gap: 6,
  color: `#114A32`,
  width: LABEL_WIDTH,
});

const TextWithBackground = styled("div")({
  fontWeight: 700,
  background: "#FBF8F3",
  padding: `0 2px`,
});

const RightPositioned = styled("div")({
  position: `absolute`,
  right: 32,
});

const ArrowIcon = ({ color = "#010700" }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.65437 2.17903C9.41571 1.94037 9.02878 1.94037 8.79013 2.17903C8.55147 2.41768 8.55147 2.80462 8.79013 3.04327L13.2469 7.50004L1.2778 7.50004C0.940296 7.50004 0.666692 7.77364 0.666692 8.11115C0.666692 8.44865 0.940296 8.72226 1.2778 8.72226L13.2469 8.72226L8.79013 13.179C8.55147 13.4177 8.55147 13.8046 8.79013 14.0433C9.02878 14.2819 9.41571 14.2819 9.65437 14.0433L15.1538 8.54385L15.1544 8.54327M9.65437 2.17903L15.1538 7.67844L9.65437 2.17903ZM15.1544 7.67903C15.1557 7.68036 15.157 7.68169 15.1583 7.68303L15.1544 7.67903ZM15.1583 7.68303C15.2128 7.73849 15.2567 7.8043 15.287 7.87722C15.2578 7.80678 15.215 7.74069 15.1583 7.68303ZM15.287 8.34507C15.2567 8.41799 15.2128 8.4838 15.1583 8.53926C15.215 8.48161 15.2578 8.41551 15.287 8.34507Z"
      fill={color}
    />
  </svg>
);

const TransferButton = styled(Button)({
  height: 32,
  margin: 23,
  marginBottom: 45,
});

const TransferButtonComponent = () => (
  <TransferButton>
    <Spacer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
      >
        <path
          d="M1.49999 8.46148C1.50143 7.17665 2.01247 5.94486 2.92099 5.03634C3.8295 4.12783 5.0613 3.61679 6.34613 3.61534H12.8077V2.53842C12.8077 2.43192 12.8392 2.32781 12.8984 2.23926C12.9576 2.15071 13.0417 2.08169 13.1401 2.04094C13.2385 2.00019 13.3467 1.98952 13.4512 2.0103C13.5556 2.03108 13.6516 2.08237 13.7269 2.15768L15.3423 3.77306C15.4432 3.87404 15.5 4.011 15.5 4.1538C15.5 4.29661 15.4432 4.43356 15.3423 4.53454L13.7269 6.14993C13.6516 6.22523 13.5556 6.27652 13.4512 6.2973C13.3467 6.31808 13.2385 6.30742 13.1401 6.26667C13.0417 6.22591 12.9576 6.1569 12.8984 6.06835C12.8392 5.97979 12.8077 5.87568 12.8077 5.76918V4.69226H6.34613C5.34681 4.69339 4.38875 5.09086 3.68213 5.79749C2.97551 6.50411 2.57803 7.46217 2.57691 8.46148C2.57691 8.60429 2.52018 8.74125 2.4192 8.84223C2.31822 8.94321 2.18126 8.99995 2.03845 8.99995C1.89564 8.99995 1.75868 8.94321 1.6577 8.84223C1.55672 8.74125 1.49999 8.60429 1.49999 8.46148ZM14.9615 7.92302C14.8187 7.92303 14.6817 7.97976 14.5808 8.08074C14.4798 8.18172 14.423 8.31868 14.423 8.46148C14.4219 9.4608 14.0244 10.4189 13.3178 11.1255C12.6112 11.8321 11.6531 12.2296 10.6538 12.2307H4.19229V11.1538C4.19229 11.0473 4.16071 10.9432 4.10154 10.8546C4.04237 10.7661 3.95827 10.6971 3.85987 10.6563C3.76148 10.6155 3.65321 10.6049 3.54876 10.6257C3.4443 10.6464 3.34836 10.6977 3.27305 10.773L1.65767 12.3884C1.5567 12.4894 1.49997 12.6264 1.49997 12.7692C1.49997 12.912 1.5567 13.0489 1.65767 13.1499L3.27305 14.7653C3.34836 14.8406 3.4443 14.8919 3.54876 14.9127C3.65321 14.9334 3.76148 14.9228 3.85987 14.882C3.95827 14.8413 4.04237 14.7723 4.10154 14.6837C4.16071 14.5952 4.19229 14.491 4.19229 14.3845V13.3076H10.6538C11.9386 13.3062 13.1704 12.7951 14.079 11.8866C14.9875 10.9781 15.4985 9.74632 15.5 8.46148C15.4999 8.31868 15.4432 8.18172 15.3422 8.08074C15.2413 7.97976 15.1043 7.92303 14.9615 7.92302Z"
          fill="#010700"
        />
      </svg>
      Transfer
    </Spacer>
  </TransferButton>
);

export const AccountsSection = ({
  accounts,
  totalBalance,
}: {
  accounts: Account[];
  totalBalance: string;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const strings = {
    [AcctType.SAVINGS]: {
      name: "Savings",
      description: "Your business account",
    },
    [AcctType.CHECKING]: {
      name: "Checking",
      description: "Your business account",
    },
    [AcctType.EARLY_INCOME]: {
      name: "Factorable",
      description: "Balance from your Unpaid Approved Invoices",
    },
  };

  useEffect(() => {
    const indexNonzeroBalance = accounts.findIndex(
      (account) => !!account.balanceCents
    );
    if (indexNonzeroBalance >= 0) {
      setSelectedIndex(indexNonzeroBalance);
    }
  }, [setSelectedIndex]);

  return (
    <VStack>
      <TotalBalance amount={totalBalance} />
      <AccountList>
        {accounts.map(({ id, type, balanceCents }, accountIndex) => (
          <AccountListItem
            key={`account-preview-${id}`}
            isSelected={selectedIndex === accountIndex}
          >
            <AccountPreview
              isDisabled={!balanceCents}
              onClick={
                balanceCents ? () => setSelectedIndex(accountIndex) : undefined
              }
            >
              <AccountBalance>{getDollarString(balanceCents)}</AccountBalance>
              <AccountType>{strings[type].name}</AccountType>
              <div>{strings[type].description}</div>
              {selectedIndex === accountIndex && (
                <FundingTransactionsLabel>
                  <BalanceHighlightIcon />
                  <TextWithBackground>
                    Funding your transactions
                  </TextWithBackground>
                </FundingTransactionsLabel>
              )}
              <RightPositioned>
                <ArrowIcon />
              </RightPositioned>
            </AccountPreview>
          </AccountListItem>
        ))}
      </AccountList>
      <TransferButtonComponent />
    </VStack>
  );
};
