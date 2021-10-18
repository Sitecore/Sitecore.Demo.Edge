import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

export function SpeakerInfoLine(props: { title: string; field: Field<string> }): JSX.Element {
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
