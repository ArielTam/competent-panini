import styled from "@emotion/styled";
import {
  CenteredVStack,
  LabelIconSpacer,
} from "../../../../../components/buildingBlocks";
import { AlertInfoIcon } from "../../../../../components/icons/AlertInfoIcon";

const RootContainer = styled(CenteredVStack)({
  marginTop: 72,
  marginBottom: 48,
});

const DollarAmount = styled("div")({
  fontWeight: 700,
  fontSize: 40,
  lineHeight: `48px`,
  color: `#010700`,
});

export const TotalBalance = ({ amount }: { amount: string }) => (
  <RootContainer>
    <DollarAmount>{amount}</DollarAmount>
    <LabelIconSpacer>
      Your spending power
      <AlertInfoIcon />
    </LabelIconSpacer>
  </RootContainer>
);
