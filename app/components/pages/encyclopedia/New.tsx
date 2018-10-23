import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia } from "../../../types";
import EncyclopediaForm, {
  State as FormState,
} from "../../organisms/EncyclopediaForm";

interface Props {
  postEncyclopedia: (d: Partial<Encyclopedia>) => Promise<Encyclopedia>;
  router: RouterProps;
}

class NewEncyclopedia extends React.Component<Props> {
  public render() {
    return <EncyclopediaForm encyclopedia={{}} onSubmit={this.submit} />;
  }

  private submit = (state: FormState) => {
    console.info("submitting", state);
    this.props.postEncyclopedia(state);
  };
}

export default connect((props: Props) => ({
  postEncyclopedia: (data: Partial<Encyclopedia>) => ({
    encyclopedia: {
      body: JSON.stringify(data),
      method: "POST",
      then: (encyclopedia: Encyclopedia) => {
        props.router.push(`/encyclopedia/${encyclopedia._id}`);
      },
      url: "/api/encyclopedia",
    },
  }),
}))(NewEncyclopedia);
