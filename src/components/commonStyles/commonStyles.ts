import { css } from "styled-components";

export const flexBase = css`
  display: flex;
  flex-direction: 1 1 auto;
`;

export const flexColumn = css`
  ${flexBase}

  flex-direction: column;
`;


