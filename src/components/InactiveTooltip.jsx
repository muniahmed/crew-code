import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

const InactiveTooltip = () => {
  return (
    <Tooltip
      label="If server is inactive, please allow up to a few minutes for server to wake up"
      fontSize="md"
    >
      <InfoOutlineIcon />
    </Tooltip>
  );
};

export default InactiveTooltip;
