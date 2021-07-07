const TestimonyList = (): JSX.Element => (
  <div className="content-list w-full p-10">
    <div className="Content-block h-40 w-full text-left flex flex-row gap-10">
      <div>
        <img className="image h-30 w-30 inline" src="" alt=""></img>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna
          accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius
          dolor non mi ornare pulvinar.
        </p>
      </div>
    </div>
    <div className="Content-block h-40 w-full text-right flex flex-row-reverse gap-10">
      <img className="image h-30 w-30 inline" src="/assets/img/tickets/IMG_0732-2.jpg" alt=""></img>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna
        accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius
        dolor non mi ornare pulvinar.
      </p>
    </div>
    <div className="Content-block h-40 w-full text-left flex flex-row gap-10">
      <img className="image h-20 w-20 inline" src="" alt=""></img>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna
        accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius
        dolor non mi ornare pulvinar.
      </p>
    </div>
  </div>
);

export default TestimonyList;
