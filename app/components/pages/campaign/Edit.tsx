import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Campaign, PromiseState } from "../../../types";
import CampaignForm, { State as FormState } from "../../organisms/CampaignForm";

interface Props {
  campaign: PromiseState<Campaign>;
  putCampaign: (d: Partial<Campaign>) => Promise<Campaign>;
  router: RouterProps;
}

class NewCampaign extends React.Component<Props> {
  public render() {
    const { campaign } = this.props;
    if (campaign.fulfilled) {
      return <CampaignForm campaign={campaign.value} onSubmit={this.submit} />;
    } else if (campaign.pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }

  private submit = (state: FormState) => {
    this.props.putCampaign(state);
  };
}

export default connect((props: Props) => ({
  campaign: `/api/campaign/${props.router &&
    props.router.query &&
    props.router.query.id}`,
  putCampaign: (data: Partial<Campaign>) => ({
    campaign: {
      body: JSON.stringify(data),
      method: "PUT",
      then: ({ _id }: Campaign) => {
        props.router.push(`/campaign/${_id}`);
      },
      url: `/api/campaign/${props.router &&
        props.router.query &&
        props.router.query.id}`,
    },
  }),
}))(NewCampaign);
