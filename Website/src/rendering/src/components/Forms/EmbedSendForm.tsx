import React from 'react';
import { Field, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { isEditingOrPreviewingPage } from '../../helpers/LayoutServiceHelper';

type EmbedSendFormProps = {
  fields: {
    sendFormId: Field<string>;
  };
};

const EmbedSendForm = (props: EmbedSendFormProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (isEditingOrPreviewingPage(sitecoreContext.pageState)) {
    const isEditing = sitecoreContext.pageEditing;
    const formIdCssClass = `form-id ${isEditing ? 'form-id-editing' : ''}`;

    const editWarning = isEditing && (
      <p className="edit-warning">
        <span>Note:</span> Editing this ID will affect all the other components that use the same
        datasource item, if any.
      </p>
    );

    return (
      <section className="section embed-send-form">
        <div className="section-content col-content container">
          <p className="component-title">Sitecore Send Form Component</p>
          <p>
            <label>Sitecore Send Form ID: </label>
            <span className={formIdCssClass}>
              <Text field={props?.fields?.sendFormId} />
            </span>
          </p>
          {editWarning}
          <p>
            Sitecore Send is disabled in edit and preview mode. You can view the form using a
            rendering host connected to the master database or by publishing and looking at the
            production website.
          </p>
        </div>
      </section>
    );
  }

  if (!props?.fields?.sendFormId?.value) {
    return <></>;
  }

  return (
    <section className="section">
      <div data-mooform-id={props.fields.sendFormId.value} />
    </section>
  );
};

export default EmbedSendForm;
