import React from "react";

import { MessageContext } from "./context";


function useNotifier() {
  return React.useContext(MessageContext);
}

export default useNotifier;
