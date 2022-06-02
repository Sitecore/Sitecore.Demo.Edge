import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import useOcAddressBook from '../../hooks/useOcAddressBook';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';

const AddressBook = (): JSX.Element => {
  const { addresses, deleteAddress } = useOcAddressBook();

  const editableAddresses = addresses ? addresses.filter((address) => address.Editable) : [];

  const noAddresses = editableAddresses.length === 0 && (
    <div>You have no addresses yet in your address book.</div>
  );

  const getDefaultBanner = (address: DBuyerAddress) => {
    if (address.xp?.DefaultBilling && address.xp?.DefaultShipping) {
      return <span className="default-banner bg-pink">Default billing and shipping</span>;
    } else if (address.xp?.DefaultBilling) {
      return <span className="default-banner bg-blue">Default billing</span>;
    } else if (address.xp?.DefaultShipping) {
      return <span className="default-banner bg-orange">Default shipping</span>;
    } else {
      return null;
    }
  };

  const addressBookList = editableAddresses.length > 0 && (
    <ul>
      {editableAddresses.map((address) => {
        return (
          <li key={address.ID}>
            <div className="address-book-item">
              <div className="address-book-item-content">
                <p className="title">{address.AddressName}</p>
                {getDefaultBanner(address)}
                <p>
                  {address.FirstName} {address.LastName}
                </p>
                <p>{address.Street1}</p>
                <p>{address.Street2}</p>
                <p>
                  {address.City}, {address.State}, {address.Zip}
                </p>
                <p>{address.Country}</p>
              </div>
              <div className="address-book-item-actions">
                <button
                  className="address-delete"
                  aria-label="Delete Address"
                  type="button"
                  onClick={() => deleteAddress(address.ID)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <Link href={`/account/address-book/${address.ID}`}>
                  <a className="address-edit" title="Edit Address">
                    <FontAwesomeIcon icon={faEdit} />
                  </a>
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="address-book shop-container section">
      <div className="address-book-header">
        <h1>Address Book</h1>
        <Link href="/account/address-book/create">
          <a className="btn--main btn--main--round">Add new address</a>
        </Link>
      </div>
      <div className="address-book-grid">
        {noAddresses}
        {addressBookList}
      </div>
    </section>
  );
};

export default AddressBook;
