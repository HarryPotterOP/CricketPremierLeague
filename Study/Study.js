document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', () => {
      let width, height;
  
      if (window.innerWidth <= 768) {
        width = 300;
        height = 600;
      } else {
        width = 800;
        height = 600;
      }
  
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
  
      window.open(
        'https://www.perplexity.ai/',
        'perplexityWindow',
        `width=${width},height=${height},top=${top},left=${left},resizable=yes`
      );
    });
  });
  