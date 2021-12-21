const router = new Navigo('/', { hash: true });
router
  .on({
    '/': () => {
      console.log('User requested main page');
      const content = document.querySelector('.content');
      content.innerHTML =
        '<h1>This is the about page</h1><h2>This page was created back in 1992</h2>';
    },

    '/candidates': () => {
      console.log('User requested the candidates page');

      const content = document.querySelector('.content');
      content.innerHTML =
        '<h1 class="welcome__text">Welcome to the candidates page. Here you can see all the candidates!</h1>';
      router.updatePageLinks();
    },
  })
  .resolve();
