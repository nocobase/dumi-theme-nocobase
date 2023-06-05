import { Link } from 'dumi';
import { FC } from 'react';

const ExternalLink: FC<any> = ({ to, children, ...rest }) => {
  return /^https?:\/\//.test(to) ? (
    <a href={to} {...rest} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

export default ExternalLink;
