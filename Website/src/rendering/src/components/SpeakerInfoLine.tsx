import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type SpeakerInfoLineProps = {
  title: string;
  field: Field<string>;
};

function SpeakerInfoLine(props: SpeakerInfoLineProps): JSX.Element {
  if (!props.field) {
    return <></>;
  }

  return (
    <div>
      <span className="data-label">{props.title}: </span>
      <Text field={props.field}></Text>
    </div>
  );
}

export default SpeakerInfoLine;
