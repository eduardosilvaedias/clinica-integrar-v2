// Aguarda o DOM estar carregado
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const form = this;
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Desabilita o botão e mostra loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';

      const formData = new FormData(form);
      // Remover o campo 'message' se existir
      formData.delete('message');
      const data = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('https://clinica-backend-production-9b7d.up.railway.app/contato', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
          // Mostra mensagem de sucesso
          successMessage.classList.remove('hidden');
          form.reset();

          // Esconde a mensagem após 5 segundos
          setTimeout(() => {
            successMessage.classList.add('hidden');
          }, 5000);
        } else {
          alert('Erro ao enviar: ' + result.message);
        }
      } catch (error) {
        alert('Erro de conexão. Tente novamente.');
        console.error(error);
      } finally {
        // Restaura o botão
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});
