import { useRouter } from "next/router";

export default function FooterButton() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div className="footer-button bg-black w-10 h-10 absolute left text-white rounded-full text-center align-bottom text-2xl left-5">
      &#8962;
    </div>
  );
}
