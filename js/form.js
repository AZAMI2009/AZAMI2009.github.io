const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Mengirim...';
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
      contactForm.reset();
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Kirim Permintaan';
      }
    }, 1600);
  });
}
