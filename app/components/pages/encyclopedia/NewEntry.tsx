import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia, EncyclopediaEntry, PromiseState } from "../../../types";
import Form, {
  State as FormState,
} from "../../organisms/EncyclopediaEntryForm";

interface Props {
  encyclopedia: PromiseState<Encyclopedia>;
  postEntry: (d: Partial<EncyclopediaEntry>) => Promise<EncyclopediaEntry>;
  router: RouterProps;
}

class NewEncyclopediaEntry extends React.Component<Props> {
  public state = {
    content: "",
    name: "",
  };

  public render() {
    const { encyclopedia } = this.props;
    if (encyclopedia.fulfilled) {
      const loaded = encyclopedia.value;
      return <Form entry={{}} encyclopedia={loaded} onSubmit={this.onSubmit} />;
    } else if (encyclopedia.pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }

  private onSubmit = (state: FormState) => {
    console.info("saving", state);
    const data = {
      ...state,
      encyclopedia: this.props.encyclopedia.value._id,
    };
    this.props.postEntry(data);
  };
}

export default connect((props: Props) => ({
  encyclopedia: `/api/encyclopedia/${props.router &&
    props.router.query &&
    props.router.query.id}`,
  postEntry: (data: Partial<EncyclopediaEntry>) => ({
    encyclopedia: {
      body: JSON.stringify(data),
      method: "POST",
      then: (entry: EncyclopediaEntry) => {
        props.router.push(`/encyclopedia/entry/${entry._id}`);
      },
      url: "/api/encyclopedia/entry",
    },
  }),
}))(NewEncyclopediaEntry);
