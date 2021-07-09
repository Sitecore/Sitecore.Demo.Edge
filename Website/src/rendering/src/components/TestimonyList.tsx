const TestimonyList = (): JSX.Element => (
  <div className="content-list w-full p-10">
    <div className="Content-block h-40 w-full text-left flex flex-row gap-10">
      <div>
        <img className="image h-30 w-40 mr-10" src="/assets/img/logo/alba.svg" alt=""></img>
      </div>
      <div>
        <p>
          &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in
          magna accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed
          varius dolor non mi ornare pulvinar.&quot;
          <br />
          <strong>Alba</strong>
        </p>
      </div>
    </div>
    <div className="Content-block h-40 w-full text-right flex flex-row-reverse gap-10">
      <img className="image h-20 w-30 ml-10" src="/assets/img/logo/striva.svg" alt=""></img>
      <p>
        &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna
        accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius
        dolor non mi ornare pulvinar.&quot;
        <br />
        <strong>Striva</strong>
      </p>
    </div>
    <div className="Content-block h-40 w-full text-left flex flex-row gap-10">
      <img className="image h-20 w-30 mr-10" src="/assets/img/logo/onthegreen.svg" alt=""></img>
      <p>
        &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna
        accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius
        dolor non mi ornare pulvinar. &quot;
        <br />
        <strong>On The Green</strong>
      </p>
    </div>
  </div>
);

export default TestimonyList;
