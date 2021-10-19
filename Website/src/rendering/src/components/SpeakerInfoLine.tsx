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
    <span className="block">
      <span className="font-bold">{props.title}: </span>
      <Text field={props.field}></Text>
    </span>
  );
}

export default SpeakerInfoLine;
