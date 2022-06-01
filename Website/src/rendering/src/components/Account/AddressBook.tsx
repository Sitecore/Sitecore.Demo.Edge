import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import useOcAddressBook from '../../hooks/useOcAddressBook';

const AddressBook = (): JSX.Element => {
  const { addresses, deleteAddress } = useOcAddressBook();

  const addressBookList = addresses.length > 0 && (
    <ul>
      {addresses.map((address) => {
        if (!address.Editable) {
          return null;
        }

        const defaultBanner = address.Billing ? (
          address.Shipping ? (
            <span className="default-banner bg-pink">Default Billing and Shipping</span>
          ) : (
            <span className="default-banner bg-blue">Default Billing</span>
          )
        ) : address.Shipping ? (
          <span className="default-banner bg-orange">Default Shipping</span>
        ) : null;

        return (
          <li key={address.ID}>
            <div className="address-book-item">
              <div className="address-book-item-content">
                <p className="title">{address.AddressName}</p>
                {defaultBanner}
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
      <div className="address-book-grid">{addressBookList}</div>
    </section>
  );
};

export default AddressBook;
