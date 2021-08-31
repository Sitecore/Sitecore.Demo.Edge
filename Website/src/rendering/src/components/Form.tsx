import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import { withRouter } from 'next/router';
import { sitecoreApiKey } from '../temp/config';

const JssNextForm = ({ fields, router }: any) => (
  <div className="text-white">
    <Form
      form={fields}
      sitecoreApiHost={''}
      sitecoreApiKey={sitecoreApiKey}
      onRedirect={(url) => router.push(url)}
    />
  </div>
);

export default withRouter(JssNextForm);
