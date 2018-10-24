import { RouterProps } from "next/router";
import React from "react";
import connect, { ConnectState } from "../../../lib/connect";
import { Encyclopedia, EncyclopediaEntry, PromiseState } from "../../../types";
import Form, {
  State as FormState,
} from "../../organisms/EncyclopediaEntryForm";

interface Props {
  encyclopedia: PromiseState<Encyclopedia>;
  entry: PromiseState<EncyclopediaEntry>;
  putEntry: (d: Partial<EncyclopediaEntry>) => Promise<EncyclopediaEntry>;
  router: RouterProps;
}

class NewEncyclopediaEntry extends React.Component<Props> {
  public state = {
    content: "",
    name: "",
  };

  public render() {
    const { encyclopedia, entry } = this.props;
    const data = ConnectState.all([entry, encyclopedia].filter(i => i));
    if (data.fulfilled) {
      const [entryData, encyclopediaData] = data.value;
      return (
        <Form
          entry={entryData}
          encyclopedia={encyclopediaData || {}}
          onSubmit={this.onSubmit}
        />
      );
    } else if (data.pending) {
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
    this.props.putEntry(data);
  };
}

export default connect((props: Props) => ({
  entry: {
    andThen: (entry: EncyclopediaEntry) => ({
      encyclopedia: `/api/encyclopedia/${entry.encyclopedia}`,
    }),
    url: `/api/encyclopedia/entry/${props.router &&
      props.router.query &&
      props.router.query.id}`,
  },
  putEntry: (data: Partial<EncyclopediaEntry>) => ({
    encyclopedia: {
      body: JSON.stringify(data),
      method: "PUT",
      then: (entry: EncyclopediaEntry) => {
        props.router.push(`/encyclopedia/entry/${entry._id}`);
      },
      url: `/api/encyclopedia/entry/${props.router &&
        props.router.query &&
        props.router.query.id}`,
    },
  }),
}))(NewEncyclopediaEntry);
