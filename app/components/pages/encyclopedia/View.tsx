import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia, EncyclopediaEntry, PromiseState } from "../../../types";

interface Props {
  encyclopedia: PromiseState<Encyclopedia>;
  entries: PromiseState<EncyclopediaEntry[]>;
  router: RouterProps;
}

class ViewEncyclopedia extends React.Component<Props> {
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
        {this.renderPromise(
          entries.fulfilled,
          entries.pending,
          () =>
            encyclopedia.value ? (
              <React.Fragment>
                <h5>Entries</h5>
                <a href={`/encyclopedia/${encyclopedia.value._id}/new`}>
                  Add entry
                </a>
                {entries.value.map(({ _id, name, content }) => (
                  <div>
                    <a href={`/encyclopedia/entry/${_id}`}>
                      {name} | <small>{content}</small>
                    </a>
                  </div>
                ))}
              </React.Fragment>
            ) : null,
        )}
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
