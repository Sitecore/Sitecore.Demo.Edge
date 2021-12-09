export const setLoadingState = (loading: boolean) => {
  if (typeof window !== 'undefined') {
    const theSpinner = document.querySelectorAll('.menu-button.refresh-button')[0];
    if (loading) {
      console.log(new Date().toLocaleTimeString() + ' spinning start');
      theSpinner.classList.add('active');
    } else {
      console.log(new Date().toLocaleTimeString() + ' spinning stop');
      theSpinner.classList.remove('active');
    }
  }
};
