import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type GalleryGridProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const GalleryGrid = (props: GalleryGridProps): JSX.Element => (
  <div>
    <p>GalleryGrid Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default GalleryGrid;
