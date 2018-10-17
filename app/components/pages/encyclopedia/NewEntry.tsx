import { RouterProps } from "next/router";
import React, { ChangeEvent, FormEvent } from "react";
import connect from "../../../lib/connect";
import { Encyclopedia, EncyclopediaEntry, PromiseState } from "../../../types";

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
    const { name, content } = this.state;
    const { encyclopedia } = this.props;
    if (encyclopedia.fulfilled) {
      const loaded = encyclopedia.value;
      return (
        <div>
          <h4>{loaded.name}</h4>
          <p>{loaded.description}</p>
          <a href={`/encyclopedia/${loaded._id}`}>Back to encyclopedia</a>
          <form onSubmit={this.submit}>
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
            <textarea name="content" onChange={this.onChange} value={content} />
            <input type="submit" onClick={this.submit} />
          </form>
        </div>
      );
    } else if (encyclopedia.pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }

  private onChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [target.name]: target.value });
  };

  private submit = async (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    const data = {
      ...this.state,
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
