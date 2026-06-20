document.addEventListener('DOMContentLoaded', () => {
  // Open dialog modal
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const modalId = trigger.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.showModal === 'function') {
        trigger.setAttribute('aria-expanded', 'true');
        modal.showModal();

        // Focus the close button inside the modal
        const closeBtn = modal.querySelector('[data-close-modal]');
        if (closeBtn) {
          setTimeout(() => closeBtn.focus(), 50);
        }

        // Clean up trigger expanded state on close
        modal.addEventListener('close', () => {
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();
        }, { once: true });
      }
    });
  });

  // Close dialog modal
  document.querySelectorAll('[data-close-modal]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const modalId = button.getAttribute('data-close-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.close();
      }
    });
  });

  // Close when clicking the backdrop
  document.querySelectorAll('dialog.modal-dialog').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  });

  // Close modals on viewport resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.querySelectorAll('dialog.modal-dialog[open]').forEach(modal => {
        modal.close();
      });
    }
  });
});
