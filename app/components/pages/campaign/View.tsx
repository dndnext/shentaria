import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Campaign, PromiseState } from "../../../types";

interface Props {
  campaign: PromiseState<Campaign>;
  router: RouterProps;
}

const ViewCampaign = ({ campaign }: Props) => {
  if (campaign.fulfilled) {
    return (
      <div>
        <h4>{campaign.value.name}</h4>
        <p>{campaign.value.description}</p>
      </div>
    );
  } else if (campaign.pending) {
    return <div>Loading</div>;
  } else {
    return <div>Error</div>;
  }
};

export default connect((props: Props) => ({
  campaign: `/api/campaign/${props.router &&
    props.router.query &&
    props.router.query.id}`,
}))(ViewCampaign);
