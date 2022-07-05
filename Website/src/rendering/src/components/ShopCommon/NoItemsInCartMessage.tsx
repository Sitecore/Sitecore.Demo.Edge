import Link from 'next/link';

const NoItemsInCartMessage = (): JSX.Element => {
  return (
    <>
      <p>It doesn&apos;t look like you have any items in your cart</p>
      <p>
        <Link href="/shop">
          <a className="btn-main continue-shopping-btn">Continue Shopping</a>
        </Link>
      </p>
    </>
  );
};

export default NoItemsInCartMessage;
