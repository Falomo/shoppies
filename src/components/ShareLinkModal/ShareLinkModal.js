import React, { useState, useCallback } from "react";
import {
  Button,
  Stack,
  Modal,
  TextField,
  TextContainer,
  Toast,
} from "@shopify/polaris";
import SocialShareList from "../SocialShare/SocialShareList";
import getSocialList from "../../socialShareList";
import "./styles.css";

export default function ShareLinkModal(props) {
  const {
    shareableLink,
    shareableLinkTitle,
    isShareModalVisible: isVisible,
    onClose,
  } = props;
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleClick = () => {
    navigator.clipboard.writeText(shareableLink);
    toggleActive();
  };

  const copiedToastMarkUp = active ? (
    <div>
      <Toast content="Link Copied" onDismiss={toggleActive} />
    </div>
  ) : null;

  return (
    <div>
      <Modal open={isVisible} onClose={onClose} title="Share your nominations">
        <Modal.Section>
          <Stack vertical>
            <Stack.Item>
              <TextContainer>
                <p>
                  You can share your nominations with your friends by copying
                  this link or use the social media links.
                </p>
              </TextContainer>
            </Stack.Item>
            <Stack.Item>
              <SocialShareList
                socialList={getSocialList(shareableLink, shareableLinkTitle)}
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                label="Get shareable link"
                value={shareableLink}
                onChange={() => {}}
                connectedRight={
                  <Button primary onClick={handleClick}>
                    Copy link
                  </Button>
                }
              />
              {copiedToastMarkUp}
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
