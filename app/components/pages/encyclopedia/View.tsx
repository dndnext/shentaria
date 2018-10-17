import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia, EncyclopediaEntry } from "../../../types";

interface Props {
  encyclopedia: {
    fulfilled: boolean;
    pending: boolean;
    value: Encyclopedia;
  };
  entries: {
    fulfilled: boolean;
    pending: boolean;
    value: EncyclopediaEntry[];
  };
  router: RouterProps;
}

class ViewEncyclopedia extends React.Component<Props> {
  public state = {
    description: "",
    name: "",
  };

  public render() {
    const { encyclopedia, entries } = this.props;
    return (
      <React.Fragment>
        {this.renderPromise(
          encyclopedia.fulfilled,
          encyclopedia.pending,
          () => (
            <React.Fragment>
              <h4>{encyclopedia.value.name}</h4>
              <p>{encyclopedia.value.description}</p>
            </React.Fragment>
          ),
        )}
        {this.renderPromise(entries.fulfilled, entries.pending, () => (
          <React.Fragment>
            <h5>Entries</h5>
            {entries.value.map(({ name, content }) => (
              <div>
                {name} | <small>{content}</small>
              </div>
            ))}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  private renderPromise(
    fulfilled: boolean,
    pending: boolean,
    render: () => void,
  ) {
    if (fulfilled) {
      return render();
    } else if (pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }
}

export default connect((props: Props) => ({
  encyclopedia: `/api/encyclopedia/${props.router &&
    props.router.query &&
    props.router.query.id}`,
  entries: `/api/encyclopedia/${props.router &&
    props.router.query &&
    props.router.query.id}/entries`,
}))(ViewEncyclopedia);
