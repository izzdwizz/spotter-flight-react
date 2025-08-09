import styled from "styled-components";

const ToastBox = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  background: white;
  border-radius: 12px;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  position: relative;
  top: 3rem;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .message p {
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0px;
    vertical-align: middle;
    margin-top: 0.5rem;
    color: #28292a;
    white-space: nowrap;
  }
`;

const StickDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 58px;
  background: ${(props) =>
    props.$isType === "success" ? "#4BD17A" : "#E8554A"};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const BespokeToast = ({ type = "success", message }) => {
  return (
    <ToastBox>
      <StickDiv $isType={type}></StickDiv>

      <ContentBox>
        <div className="message">
          <p>{message}</p>
        </div>
      </ContentBox>
    </ToastBox>
  );
};

export default BespokeToast;
