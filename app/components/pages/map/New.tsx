import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Map } from "../../../types";
import MapForm, { State as FormState } from "../../organisms/MapForm";

interface Props {
  postMap: (d: Partial<Map>) => Promise<Map>;
  router: RouterProps;
}

class NewCampaign extends React.Component<Props> {
  public render() {
    return <MapForm map={{}} onSubmit={this.submit} />;
  }

  private submit = (state: FormState) => {
    this.props.postMap(state);
  };
}

export default connect((props: Props) => ({
  postMap: (data: Partial<Map>) => ({
    map: {
      body: JSON.stringify(data),
      method: "POST",
      then: ({ _id }: Map) => {
        props.router.push(`/map/${_id}/editor`);
      },
      url: "/api/map",
    },
  }),
}))(NewCampaign);
