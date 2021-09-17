type SplashProps = {
  test: string;
};

const Splash = (props: SplashProps): JSX.Element => {
  return <div>{props.test}</div>;
};

export default Splash;
