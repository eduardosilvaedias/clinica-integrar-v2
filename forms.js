document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('https://seu-dominio.com/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        successMessage.classList.remove('hidden');
        form.reset();
        setTimeout(() => successMessage.classList.add('hidden'), 5000);
      } else {
        alert('Erro ao enviar: ' + result.message);
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.');
      console.error(error);
    }
  });
});
