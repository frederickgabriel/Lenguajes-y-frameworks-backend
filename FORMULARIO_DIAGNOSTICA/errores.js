document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const queryType = document.getElementsByName('queryType');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.querySelector('.submit-btn');

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar error
    function showError(element) {
        const formGroup = element.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            formGroup.classList.remove('valid');
        }
    }

    // Función para ocultar error y mostrar válido
    function showValid(element) {
        const formGroup = element.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            formGroup.classList.add('valid');
        }
    }

    // Función para ocultar error sin marcar como válido
    function hideError(element) {
        const formGroup = element.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
        }
    }

    // Función para mostrar mensaje de éxito
    function showSuccessMessage() {
        successMessage.classList.add('show');
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }

    // Función para mostrar mensaje de error
    function showErrorMessage(errorMsg) {
        alert('Error: ' + errorMsg);
    }

    // Validación en tiempo real - First Name
    firstName.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            showValid(this);
        } else {
            hideError(this);
        }
    });

    firstName.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.closest('.form-group').classList.remove('valid');
        }
    });

    // Validación en tiempo real - Last Name
    lastName.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            showValid(this);
        } else {
            hideError(this);
        }
    });

    lastName.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.closest('.form-group').classList.remove('valid');
        }
    });

    // Validación en tiempo real - Email
    email.addEventListener('input', function() {
        if (isValidEmail(this.value)) {
            showValid(this);
        } else {
            hideError(this);
        }
    });

    email.addEventListener('blur', function() {
        if (!isValidEmail(this.value)) {
            this.closest('.form-group').classList.remove('valid');
        }
    });

    // Validación en tiempo real - Message
    message.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            showValid(this);
        } else {
            hideError(this);
        }
    });

    message.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.closest('.form-group').classList.remove('valid');
        }
    });

    // Validación en tiempo real - Query Type
    queryType.forEach(radio => {
        radio.addEventListener('change', function() {
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('error');
            formGroup.classList.add('valid');
            
            // Actualizar estilos de las opciones de radio
            document.querySelectorAll('.radio-option').forEach(option => {
                option.classList.remove('selected');
            });
            this.closest('.radio-option').classList.add('selected');
        });
    });

    // Validación en tiempo real - Consent
    consent.addEventListener('change', function() {
        const checkboxGroup = this.closest('.checkbox-group');
        if (this.checked) {
            checkboxGroup.classList.remove('error');
            checkboxGroup.classList.add('valid');
        } else {
            checkboxGroup.classList.remove('valid');
        }
    });

    // Validación al enviar el formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Limpiar errores previos
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        document.querySelector('.checkbox-group').classList.remove('error');

        // Validar First Name
        if (firstName.value.trim() === '') {
            showError(firstName);
            isValid = false;
        } else {
            showValid(firstName);
        }

        // Validar Last Name
        if (lastName.value.trim() === '') {
            showError(lastName);
            isValid = false;
        } else {
            showValid(lastName);
        }

        // Validar Email
        if (!isValidEmail(email.value)) {
            showError(email);
            isValid = false;
        } else {
            showValid(email);
        }

        // Validar Query Type
        let querySelected = false;
        let selectedQueryType = '';
        queryType.forEach(radio => {
            if (radio.checked) {
                querySelected = true;
                selectedQueryType = radio.value;
                const formGroup = radio.closest('.form-group');
                formGroup.classList.add('valid');
                radio.closest('.radio-option').classList.add('selected');
            }
        });
        if (!querySelected) {
            queryType[0].closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validar Message
        if (message.value.trim() === '') {
            showError(message);
            isValid = false;
        } else {
            showValid(message);
        }

        // Validar Consent
        if (!consent.checked) {
            document.querySelector('.checkbox-group').classList.add('error');
            isValid = false;
        } else {
            document.querySelector('.checkbox-group').classList.add('valid');
        }

        // Si todo es válido, enviar datos al servidor
        if (isValid) {
            // Deshabilitar botón de envío
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Preparar datos para enviar
            const formData = {
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                email: email.value.trim(),
                queryType: selectedQueryType,
                message: message.value.trim(),
                consent: consent.checked
            };

            try {
                // Enviar datos al servidor
                const response = await fetch('submit_form.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // Mostrar mensaje de éxito
                    showSuccessMessage();
                    
                    // Limpiar el formulario después de un breve delay
                    setTimeout(() => {
                        form.reset();
                        // Remover todas las clases de validación
                        document.querySelectorAll('.form-group').forEach(group => {
                            group.classList.remove('valid', 'error');
                        });
                        document.querySelectorAll('.radio-option').forEach(option => {
                            option.classList.remove('selected');
                        });
                        document.querySelector('.checkbox-group').classList.remove('valid', 'error');
                    }, 500);
                } else {
                    // Mostrar mensaje de error
                    showErrorMessage(result.message || 'Error al enviar el formulario');
                }
            } catch (error) {
                console.error('Error:', error);
                showErrorMessage('Error de conexión. Por favor, intente nuevamente.');
            } finally {
                // Rehabilitar botón de envío
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
            }
        }
    });
});


