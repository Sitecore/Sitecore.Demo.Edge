import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import { withRouter } from 'next/router';
import { sitecoreApiKey } from '../temp/config';

const JssNextForm = ({ fields, router }: any) => (
  <Form
    form={fields}
    sitecoreApiHost={''}
    sitecoreApiKey={sitecoreApiKey}
    onRedirect={(url) => router.push(url)}
  />
);

export default withRouter(JssNextForm);
