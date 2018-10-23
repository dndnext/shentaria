import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia, PromiseState } from "../../../types";
import EncyclopediaForm, {
  State as FormState,
} from "../../organisms/EncyclopediaForm";

interface Props {
  encyclopedia: PromiseState<Encyclopedia>;
  putEncyclopedia: (d: Partial<Encyclopedia>) => Promise<Encyclopedia>;
  router: RouterProps;
}

class EditEncyclopedia extends React.Component<Props> {
  public render() {
    const { encyclopedia } = this.props;
    if (encyclopedia.pending) {
      return <div>Loading</div>;
    } else if (encyclopedia.fulfilled) {
      return (
        <EncyclopediaForm
          encyclopedia={encyclopedia.value}
          onSubmit={this.submit}
        />
      );
    } else {
      return <div>Error</div>;
    }
  }

  private submit = (state: FormState) => {
    console.info("submitting", state);
    this.props.putEncyclopedia(state);
  };
}

export default connect((props: Props) => ({
  encyclopedia: `/api/encyclopedia/${props.router &&
    props.router.query &&
    props.router.query.id}`,
  putEncyclopedia: (data: Partial<Encyclopedia>) => ({
    encyclopedia: {
      body: JSON.stringify(data),
      method: "PUT",
      then: (encyclopedia: Encyclopedia) => {
        props.router.push(`/encyclopedia/${encyclopedia._id}`);
      },
      url: `/api/encyclopedia/${props.router &&
        props.router.query &&
        props.router.query.id}`,
    },
  }),
}))(EditEncyclopedia);
