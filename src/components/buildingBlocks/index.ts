import styled from "@emotion/styled";

export const HStack = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

export const VStack = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const CenteredVStack = styled(VStack)({
  alignItems: "center",
});

export const Spacer = styled(HStack)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const Divider = styled("div")({
  width: `auto`,
  height: 2,
  background: `#E5E3DE`,
  margin: `24px 0`,
});

export const HorizontalScrollable = styled("div")({
  display: "flex",
  overflowX: "auto",
});

export const Button = styled("button")({
  background: "none",
  border: `1px solid #83817E`,
  borderRadius: 20,
  width: `auto`,
  fontWeight: 500,
  color: "#010700",
  fontSize: 16,
  cursor: "pointer",
});

export const LabelIconSpacer = styled(HStack)({
  gap: 8,
});
