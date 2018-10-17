import React from "react";
import connect from "../../../lib/connect";
import { Campaign, PromiseState } from "../../../types";

interface Props {
  campaigns: PromiseState<Campaign[]>;
}

const ListCampaign = ({ campaigns }: Props) => {
  if (campaigns.fulfilled) {
    return (
      <React.Fragment>
        <a href="/new/campaign">New Campaign</a>
        {campaigns.value.map(({ _id, name, description }) => (
          <div key={_id}>
            <a href={`/campaign/${_id}`}>
              <strong>{name}</strong>
            </a>
            <p>{description}</p>
          </div>
        ))}
      </React.Fragment>
    );
  } else if (campaigns.pending) {
    return <div>Loading</div>;
  } else {
    return <div>Error</div>;
  }
};

export default connect(() => ({
  campaigns: "/api/campaign",
}))(ListCampaign);
