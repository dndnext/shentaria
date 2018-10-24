import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Campaign } from "../../../types";
import CampaignForm, { State as FormState } from "../../organisms/CampaignForm";

interface Props {
  postCampaign: (d: Partial<Campaign>) => Promise<Campaign>;
  router: RouterProps;
}

class NewCampaign extends React.Component<Props> {
  public render() {
    return <CampaignForm campaign={{}} onSubmit={this.submit} />;
  }

  private submit = (state: FormState) => {
    this.props.postCampaign(state);
  };
}

export default connect((props: Props) => ({
  postCampaign: (data: Partial<Campaign>) => ({
    campaign: {
      body: JSON.stringify(data),
      method: "POST",
      then: ({ _id }: Campaign) => {
        props.router.push(`/campaign/${_id}`);
      },
      url: "/api/campaign",
    },
  }),
}))(NewCampaign);
