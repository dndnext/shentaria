import Grid from "@material-ui/core/Grid";
import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia, EncyclopediaEntry, PromiseState } from "../../../types";
import AddButton from "../../atoms/NewButton";
import EncyclopediaCard from "../../molecules/EncyclopediaCard";
import EncyclopediaEntryCard from "../../molecules/EncyclopediaEntryCard";

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
              <EncyclopediaCard {...encyclopedia.value} />
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
                  <AddButton />
                </a>
                {entries.value.map(entry => (
                  <Grid item key={entry._id}>
                    <EncyclopediaEntryCard {...entry} />
                  </Grid>
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
