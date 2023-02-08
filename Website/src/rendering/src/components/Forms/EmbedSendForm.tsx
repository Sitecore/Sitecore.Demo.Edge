import React from 'react';
import { LayoutServicePageState, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

type EmbedSendFormProps = {
  params: { [key: string]: string };
};

const EmbedSendForm = (props: EmbedSendFormProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  if (!props?.params?.sendFormId) {
    if (!isPageEditing) {
      return <></>;
    }

    return (
      <section className="section">
        <div className="section-content col-content container">
          <p className="section-content-p">
            <strong>Action required</strong> - Sitecore Send Form Component
          </p>
          <p>Add the form ID as a rendering parameter on this component</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div data-mooform-id={`${props?.params?.sendFormId}`} />
    </section>
  );
};

export default EmbedSendForm;
