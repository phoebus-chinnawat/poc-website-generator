document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('business-form').addEventListener('submit', (event) => {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      const businessData = Object.fromEntries(formData.entries());

      fetch('/generate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(businessData)
      }).then(response => response.text())
      .then(html => {
          document.open();
          document.write(html);
          document.close();
      }).catch(error => console.error('Error:', error));
  });

    document.getElementById('publish').addEventListener('click', () => {
        const sectionOrder = Array.from(document.querySelectorAll('.section')).map(section => section.id);

        fetch('/publish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sections: sectionOrder })
        }).then(response => response.text())
        .then(html => {
            document.open();
            document.write(html);
            document.close();
        }).catch(error => console.error('Error:', error));
    });
});
