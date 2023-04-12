import * as React from 'react';
import * as M from 'lib/Month';
import { Redirect } from '@reach/router';

const IndexPage: React.FC = ({ ...props }) => {
  const d = M.getMonthNameFromDate(new Date());
  return <Redirect noThrow to={`/${d}`} />;
};

export default IndexPage;
