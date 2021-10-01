const InstagramPost = () => {
  return (
    <>
      <div className="post">
        <div className="name">
          <img
            src="https://randomuser.me/api/portraits/women/84.jpg"
            width="10%"
            height="10%"
            className="profile-img"
          />
          <p>Danielle Pierce</p>
        </div>
        <img
          src="https://image.flaticon.com/icons/svg/149/149947.svg"
          width="5%"
        />
        {/* style="opacity:0.5;"        */}
      </div>
      <div className="post-image">
        <img
          src="https://c1.staticflickr.com/4/3851/14948376317_a97232356c_z.jpg"
          width="100%"
        />
      </div>
      <div className="likes">
        <div className="left-icons">
          <img
            src="https://image.flaticon.com/icons/svg/25/25424.svg"
            width="8%"
          />
          <img
            src="https://image.flaticon.com/icons/svg/54/54916.svg"
            width="8%"
          />
          <img
            src="https://image.flaticon.com/icons/svg/126/126536.svg"
            width="8%"
          />
        </div>
        <img
          src="https://image.flaticon.com/icons/svg/25/25667.svg"
          width="6%"
        />
      </div>
      <div className="like-count">
        <img
          src="https://image.flaticon.com/icons/svg/60/60993.svg"
          width="4%"
        />
        <p>24 likes</p>
      </div>
      <div className="detail">
        <p>
          <span className="username">Play! Summit</span> Description goes here
        </p>
      </div>
    </>
  );
};

export default InstagramPost;
