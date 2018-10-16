import React, { ChangeEvent, FormEvent } from "react";
import connect from "../../../lib/connect";
import { Encyclopedia } from "../../../types";

interface Props {
  encyclopedia: any[];
  postEncyclopedia: (d: Partial<Encyclopedia>) => void;
}

class NewEncyclopedia extends React.Component<Props> {
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
    this.props.postEncyclopedia(this.state);
  };
}

export default connect(() => ({
  postEncyclopedia: (data: Partial<Encyclopedia>) => ({
    encyclopedia: {
      body: JSON.stringify(data),
      method: "POST",
      url: "/api/encyclopedia",
    },
  }),
}))(NewEncyclopedia);