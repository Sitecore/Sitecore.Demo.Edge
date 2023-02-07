import React from 'react';

type EmbedSendFormProps = {
  params: { [key: string]: string };
};

const EmbedSendForm = (props: EmbedSendFormProps): JSX.Element => {
  return (
    <section className="section">
      <div data-mooform-id={`${props.params.sendFormId}`}/>
    </section>
  );
};

export default EmbedSendForm;
