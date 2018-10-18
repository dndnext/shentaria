import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import connect from "../../../lib/connect";
import { Campaign, PromiseState } from "../../../types";
import AddButton from "../../atoms/NewButton";
import CampaignCard from "../../molecules/CampaignCard";

interface Props {
  campaigns: PromiseState<Campaign[]>;
  classes: any;
}

const styles = createStyles(({ spacing }: Theme) => ({
  item: {
    cursor: "pointer",
    margin: spacing.unit,
  },
}));

const ListCampaign = ({ campaigns, classes }: Props) => {
  if (campaigns.fulfilled) {
    return (
      <React.Fragment>
        <a href="/new/campaign">
          <AddButton />
        </a>
        <Grid container>
          {campaigns.value.map(campaign => (
            <Grid item key={campaign._id} className={classes.item}>
              <CampaignCard {...campaign} />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  } else if (campaigns.pending) {
    return <div>Loading</div>;
  } else {
    return <div>Error</div>;
  }
};

export default withStyles(styles)(
  connect(() => ({
    campaigns: "/api/campaign",
  }))(ListCampaign),
);
