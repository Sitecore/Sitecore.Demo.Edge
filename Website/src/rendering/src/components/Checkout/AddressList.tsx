import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';
import AddressCard from './AddressCard';

type AddressListProps = {
  addresses: DBuyerAddress[];
  activeAddressId: string;
  onClick: (address: DBuyerAddress) => void;
};

const AddressList = (props: AddressListProps): JSX.Element => {
  const addressList =
    props.addresses.length &&
    props.addresses.map((address) => (
      <AddressCard
        onClick={(address) => props.onClick(address)}
        key={address.ID}
        address={address}
        active={address.ID === props.activeAddressId}
      />
    ));

  return <div className="address-list">{addressList}</div>;
};

export default AddressList;
