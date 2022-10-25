import styled from "styled-components";

export const ModalContainer = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  z-index: 1;
`;

export const ModalOverlay = styled.a`
  background: linear-gradient(285.82deg, #193970 -75.26%, #12203d 72.97%)
    no-repeat fixed;
  opacity: 0.72;
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const ModalClose = styled.a`
  float: right !important;
  text-decoration: none !important;
  cursor: pointer;
  font-size: 1rem;
`;

export const ModalContent = styled.div`
  background: #1c2847;
  color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  max-width: 350px;
  padding: 30px 40px;
  animation: slide-down 0.2s ease 1;
  z-index: 1;
  box-shadow: 0px 6px 26px rgba(0, 0, 0, 0.25);
`;

export const ModalBody = styled.div`
  overflow-y: auto;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  padding: 20px 5px 10px 5px;
`;

export const ModalTitle = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

export const ModalFooter = styled.div`
  padding: 10px 0px;
  text-align: right;
`;
