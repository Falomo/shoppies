import React from "react";

import { List, Icon, Button } from "@shopify/polaris";
import "./styles.css";

export default function SocialShareList(props) {
  const { socialList = [] } = props;

  const getSocialListItem = (socialListItem) => {
    return (
      <List.Item key={socialListItem.name}>
        <a target="_blank" rel="noreferrer" href={socialListItem.url}>
          <Button icon={<Icon source={socialListItem.svg} />} plain>
            Share to {socialListItem.name}
          </Button>
        </a>
      </List.Item>
    );
  };

  return (
    <div className="shoppies-social-links">
      <List>
        {socialList.map((socialListItem) => getSocialListItem(socialListItem))}
      </List>
    </div>
  );
}
