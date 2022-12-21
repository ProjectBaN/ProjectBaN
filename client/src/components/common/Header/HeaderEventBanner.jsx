import React from 'react';
import styled from 'styled-components';
import EventBannerSlide from '../../../asset/images/HeaderEventBanner.jpg';
const EventBannerContainer = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
  }
`;
function HeaderEventBanner() {
  return (
    <EventBannerContainer>
      <img src={EventBannerSlide} alt="" />
    </EventBannerContainer>
  );
}

export default HeaderEventBanner;
