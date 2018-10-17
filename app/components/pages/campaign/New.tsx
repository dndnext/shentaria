import { RouterProps } from "next/router";
import React, { ChangeEvent, FormEvent } from "react";
import connect from "../../../lib/connect";
import { Campaign } from "../../../types";

interface Props {
  post: (d: Partial<Campaign>) => Promise<Campaign>;
  router: RouterProps;
}

class NewCampaign extends React.Component<Props> {
  public state = {
    description: "",
    name: "",
  };

  public render() {
    const { name, description } = this.state;
    return (
      <form onSubmit={this.submit}>
        <input type="text" name="name" onChange={this.onChange} value={name} />
        <textarea
          name="description"
          onChange={this.onChange}
          value={description}
        />
        <input type="submit" onClick={this.submit} />
      </form>
    );
  }

  private onChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [target.name]: target.value });
  };

  private submit = async (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    this.props.post(this.state);
  };
}

export default connect((props: Props) => ({
  post: (data: Partial<Campaign>) => ({
    encyclopedia: {
      body: JSON.stringify(data),
      method: "POST",
      then: (campaign: Campaign) => {
        props.router.push(`/campaign/${campaign._id}`);
      },
      url: "/api/campaign",
    },
  }),
}))(NewCampaign);
