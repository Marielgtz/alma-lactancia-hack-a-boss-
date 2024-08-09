document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('firstName').value,
        surname: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showResponseMessage('¡Formulario enviado con éxito!', 'success');
            document.getElementById('contactForm').reset();  // Restablecer el formulario
        } else {
            showResponseMessage('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.', 'error');
        }
    })
    .catch(error => {
        showResponseMessage('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.', 'error');
    });
});

function showResponseMessage(message, type) {
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = message;
    responseMessage.className = type === 'success' ? 'success' : 'error';
    responseMessage.classList.remove('hidden');
}
