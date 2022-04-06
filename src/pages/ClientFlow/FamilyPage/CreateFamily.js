import React from "react";
import { withRouter } from "react-router";
import CreateFamily from "components/clientFlow/Family/CreateFamilyMembers";

const CreateFamilyPage = () => {
  return <CreateFamily />;
};

export default withRouter(CreateFamilyPage);
