import { colors } from "../../constants";

export interface InvoiceIconProps {
  isActive?: boolean;
}

export const InvoiceIcon = ({ isActive = false }: InvoiceIconProps) => {
  const color = isActive ? colors.object.primary : colors.type.tertiary;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.38462 1C5.48696 1 4.62607 1.35659 3.99133 1.99133C3.35659 2.62607 3 3.48696 3 4.38462V21.3077V22.1538C3 22.6212 3.37884 23 3.84615 23H19.0769C19.5442 23 19.9231 22.6212 19.9231 22.1538C19.9231 21.6865 19.5442 21.3077 19.0769 21.3077L4.69231 21.3077C4.69231 20.8589 4.8706 20.4284 5.18797 20.111C5.50534 19.7937 5.93579 19.6154 6.38462 19.6154H20.7692C21.2365 19.6154 21.6154 19.2365 21.6154 18.7692V1.84615C21.6154 1.37884 21.2365 1 20.7692 1H6.38462ZM6.38462 17.9231C5.78534 17.9231 5.20246 18.082 4.69231 18.3765V4.38462C4.69231 3.93579 4.8706 3.50534 5.18797 3.18797C5.50534 2.8706 5.93579 2.69231 6.38462 2.69231H19.9231V17.9231H6.38462Z"
        fill={color}
      />
    </svg>
  );
};
