import React from 'react';
import {
  Field,
  LayoutServicePageState,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
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

    // Note: The fragment is required to keep the className on the p element. Otherwise, the className is set to the element following the editWarning.
    const editWarning = isEditing && (
      <>
        <p className="edit-warning">
          <span>Note:</span> Editing this ID will affect all the components that use the same
          datasource item, if any.
        </p>
      </>
    );

    return (
      <section className="section embed-send-form">
        <div className="section-content col-content container">
          <p className="component-title">Sitecore Send Form Component</p>
          <p>
            <label>Sitecore Send Form ID: </label>
            <div className={formIdCssClass}>
              <Text field={props.fields.sendFormId} />
            </div>
          </p>
          {editWarning}
          <p>
            Sitecore Send is disabled in edit and preview mode. Please publish to view the form on
            the website.
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
