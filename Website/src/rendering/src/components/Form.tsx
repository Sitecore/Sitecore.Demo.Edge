import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import { withRouter } from 'next/router';
import { sitecoreApiKey } from '../temp/config';
import { getPublicUrl } from '../lib/util';
const JssNextForm = ({ fields, router }: any) => {
  console.log(fields);
  return (
    <div className="text-white">
      <Form
        form={fields}
        sitecoreApiHost={getPublicUrl()}
        sitecoreApiKey={sitecoreApiKey}
        onRedirect={(url) => router.push(url)}
      />
    </div>
  );
};

export default withRouter(JssNextForm);
