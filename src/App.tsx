import styled from "@emotion/styled";
import { NavBar } from "./components/NavBar/NavBar";
import { BalancePage } from "./pages/BalancePage/BalancePage";

const NAV_HEIGHT = 88;

const Scrollable = styled("div")({
  overflow: "auto",
  height: `calc(100vh - ${NAV_HEIGHT}px)`,
});

const RootContainer = styled("div")({
  fontSize: 16,
  background: "#FBF8F3",
  fontFamily: "sans-serif",
});

/**
 * incomplete: 
 *  - [] import fonts
 *  - [] clean up hex values
 *  - [] get rid of visible scrollbar
 *  - [] button a11y like hover states
 */
export const App = () => {
  return (
    <RootContainer>
      <Scrollable>
        <BalancePage />
      </Scrollable>
      <NavBar />
    </RootContainer>
  );
};
