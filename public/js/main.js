document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.editable').forEach((element) => {
      element.addEventListener('click', () => {
          const newText = prompt('Edit text:', element.innerText);
          if (newText !== null) {
              element.innerText = newText;
          }
      });
  });

  document.getElementById('swap-sections').addEventListener('click', () => {
      const section1 = document.getElementById('section1');
      const section2 = document.getElementById('section2');
      const temp = section1.innerHTML;
      section1.innerHTML = section2.innerHTML;
      section2.innerHTML = temp;
  });

  document.getElementById('save-changes').addEventListener('click', () => {
      const businessData = {
          shopName: document.getElementById('shopName').innerText,
          description: document.getElementById('description').innerText,
          location: document.getElementById('location').innerText,
          reviewers: Array.from(document.querySelectorAll('.reviewer')).map((element) => ({
              name: element.querySelector('.reviewer-name').innerText,
              review: element.querySelector('.reviewer-review').innerText
          })),
          contacts: {
              phone: document.getElementById('contact-phone').innerText,
              email: document.getElementById('contact-email').innerText
          }
      };

      fetch('/save', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(businessData)
      }).then(response => response.json())
      .then(data => alert('Changes saved successfully!'))
      .catch(error => console.error('Error:', error));
  });
});
