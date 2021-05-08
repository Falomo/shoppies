import React from "react";
import { ShareMinor } from "@shopify/polaris-icons";

import { Card, Button, List, TextContainer, Icon } from "@shopify/polaris";

const getNominationsList = (nominations, onRemove) =>
  nominations.map((nomination) => (
    <List.Item key={nomination.imdbID}>
      {nomination.Title} ({nomination.Year}){" "}
      <Button onClick={() => onRemove(nomination)} variant="light">
        Remove
      </Button>
    </List.Item>
  ));

export default function Nominations(props) {
  const { data, onRemove, onShareNominationClick } = props;
  return (
    <div>
      <Card title="Nominations" sectioned>
        <TextContainer >
          <p style = {{ marginBottom: "10px"}}><b>You can make a maximum of 5 nominations.</b></p>
        </TextContainer>
        <List>{getNominationsList(data, onRemove)}</List>

        <div style={{ marginTop: 20 }}>
          <Button
            icon={<Icon source={ShareMinor} />}
            primary
            onClick={onShareNominationClick}
            disabled = {data.length < 1}
          >
            Share Nominations
          </Button>
        </div>
      </Card>
    </div>
  );
}
