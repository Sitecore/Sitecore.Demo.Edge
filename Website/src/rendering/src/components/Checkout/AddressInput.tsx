import { useForm } from 'src/hooks/useForm/useForm';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';

type AddressInputProps = {
  address?: DBuyerAddress;
};

interface AddressForm {
  AddressName?: string;
  Street1: string;
  Street2?: string;
  City: string;
  State: string;
  Zip: string;
  Country: string;
}

const AddressInput = (props: AddressInputProps): JSX.Element => {
  const { handleSubmit, handleChange, data, errors } = useForm<AddressForm>({
    validations: {
      Street1: {
        required: true,
      },
      City: {
        required: true,
      },
      State: {
        required: true,
      },
      Zip: {
        required: true,
      },
      Country: {},
    },
    initialValues: {},
    onSubmit: () => console.log('coool!'),
  });
  const isUpdatingAddress = Boolean(props.address.ID);
  return (
    <div>
      <p>{props.params.name} Component</p>
    </div>
  );
};

export default AddressInput;
