// Variables globales
const correctPassword = "2018";
let currentInput = "";

// Elementos del DOM
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');
const safePage = document.getElementById('safePage');
const letterPage = document.getElementById('letterPage');
const digits = [
    document.getElementById('digit1'),
    document.getElementById('digit2'),
    document.getElementById('digit3'),
    document.getElementById('digit4')
];

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Enfocar el input de contraseña
    passwordInput.focus();
    
    // Agregar event listeners
    passwordInput.addEventListener('input', updateCombinationDisplay);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Efectos de sonido y animaciones
    addSparkleEffects();
});

// Actualizar la pantalla de combinación mientras el usuario escribe
function updateCombinationDisplay() {
    const input = passwordInput.value;
    
    // Actualizar cada dígito en la pantalla
    for (let i = 0; i < 4; i++) {
        if (i < input.length) {
            digits[i].textContent = input[i];
            digits[i].style.color = '#00ff41';
            digits[i].style.textShadow = '0 0 10px #00ff41';
        } else {
            digits[i].textContent = '0';
            digits[i].style.color = '#666';
            digits[i].style.textShadow = 'none';
        }
    }
    
    // Limpiar mensajes de error
    errorMessage.textContent = '';
}

// Verificar la contraseña
function checkPassword() {
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === "") {
        showError("Por favor, introduce la combinación");
        shakeAnimation();
        return;
    }
    
    if (enteredPassword === correctPassword) {
        showSuccess();
        unlockSafe();
    } else {
        showError("❌ Combinación incorrecta. Inténtalo de nuevo.");
        shakeAnimation();
        resetCombination();
    }
}

// Mostrar mensaje de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.className = 'error-message';
    errorMessage.style.animation = 'fadeIn 0.3s ease';
}

// Mostrar mensaje de éxito y abrir la caja fuerte
function showSuccess() {
    errorMessage.textContent = "¡Te acordaste, mi amor! Abriendo caja fuerte...";
    errorMessage.className = 'success-message';
    
    // Animar la combinación como correcta
    digits.forEach((digit, index) => {
        setTimeout(() => {
            digit.style.color = '#4caf50';
            digit.style.textShadow = '0 0 15px #4caf50';
            digit.style.transform = 'scale(1.2)';
            digit.style.transition = 'all 0.3s ease';
        }, index * 100);
    });
}

// Abrir la caja fuerte y mostrar la carta
function unlockSafe() {
    setTimeout(() => {
        // Animar la apertura de la caja fuerte
        const safeDoor = document.querySelector('.safe-door');
        safeDoor.style.transform = 'rotateY(-120deg)';
        safeDoor.style.transformOrigin = 'left center';
        safeDoor.style.transition = 'transform 1s ease';
        
        // Cambiar a la página de la carta después de la animación
        setTimeout(() => {
            safePage.classList.remove('active');
            letterPage.classList.add('active');
        }, 1200);
    }, 1000);
}

// Animación de error (temblor)
function shakeAnimation() {
    const safeContainer = document.querySelector('.safe-container');
    safeContainer.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        safeContainer.style.animation = '';
    }, 500);
}

// Resetear la combinación después de error
function resetCombination() {
    setTimeout(() => {
        passwordInput.value = '';
        digits.forEach(digit => {
            digit.textContent = '0';
            digit.style.color = '#666';
            digit.style.textShadow = 'none';
            digit.style.transform = 'scale(1)';
        });
        passwordInput.focus();
    }, 1000);
}

// Volver a la página de la caja fuerte
function goBack() {
    letterPage.classList.remove('active');
    safePage.classList.add('active');
    
    // Resetear la caja fuerte
    setTimeout(() => {
        const safeDoor = document.querySelector('.safe-door');
        safeDoor.style.transform = 'rotateY(0deg)';
        passwordInput.value = '';
        errorMessage.textContent = '';
        
        digits.forEach(digit => {
            digit.textContent = '0';
            digit.style.color = '#666';
            digit.style.textShadow = 'none';
            digit.style.transform = 'scale(1)';
        });
        
        passwordInput.focus();
    }, 300);
}

// Agregar efectos de partículas brillantes
function addSparkleEffects() {
    const container = document.querySelector('.safe-container');
    
    setInterval(() => {
        createSparkle(container);
    }, 2000);
}

// Crear partícula brillante
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.left = Math.random() * container.offsetWidth + 'px';
    sparkle.style.top = Math.random() * container.offsetHeight + 'px';
    sparkle.style.animation = 'sparkleFloat 3s ease forwards';
    
    container.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

// Agregar estilos CSS para animaciones dinámicas
const dynamicStyles = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@keyframes sparkleFloat {
    0% {
        opacity: 0;
        transform: translateY(0) scale(0);
    }
    50% {
        opacity: 1;
        transform: translateY(-20px) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-40px) scale(0);
    }
}

.safe-door {
    transition: transform 1s ease;
}
`;

// Agregar estilos dinámicos al head
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Efecto de tecleo para la carta (opcional)
function typewriterEffect() {
    // Esta función se puede usar para crear un efecto de escritura en la carta
    console.log("Caja fuerte de Valeria cargada correctamente 💖");
}

// Función para descargar la carta como PDF
function downloadAsPDF() {
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.innerHTML;
    
    // Cambiar el estado del botón inmediatamente
    downloadBtn.innerHTML = '⏳ Preparando...';
    downloadBtn.disabled = true;

    // Esperar un poco para que se cargue jsPDF si aún no está listo
    setTimeout(() => {
        // Verificar múltiples formas de acceder a jsPDF
        let jsPDF = null;
        
        if (window.jsPDF && window.jsPDF.jsPDF) {
            jsPDF = window.jsPDF.jsPDF;
        } else if (window.jsPDF) {
            jsPDF = window.jsPDF;
        } else if (window.jspdf && window.jspdf.jsPDF) {
            jsPDF = window.jspdf.jsPDF;
        }

        if (!jsPDF) {
            // Si no hay jsPDF disponible, usar método alternativo
            downloadAsTextFile();
            return;
        }

        try {
            downloadBtn.innerHTML = '📄 Generando PDF...';
            
            const doc = new jsPDF();

            // Configuración del documento
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxWidth = pageWidth - (margin * 2);

            // Colores rosados para el tema
            const primaryColor = [173, 20, 87]; // #ad1457
            const secondaryColor = [248, 187, 217]; // #f8bbd9

            // Extraer el título del HTML
            const letterHeader = document.querySelector('.letter-header h2');
            const title = letterHeader ? letterHeader.textContent.replace(/💌/g, '').trim() : 'Carta Especial para Valeria';

            // Título (sin emojis para mejor compatibilidad)
            doc.setFontSize(22);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(title, pageWidth / 2, 30, { align: 'center' });

            // Línea decorativa
            doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            doc.setLineWidth(2);
            doc.line(margin, 40, pageWidth - margin, 40);

            // Extraer el contenido de la carta del HTML
            const letterContent = document.querySelector('.letter-content');
            let letterText = '';
            
            if (letterContent) {
                // Obtener todos los párrafos excepto la firma
                const paragraphs = letterContent.querySelectorAll('p:not(.signature)');
                paragraphs.forEach(p => {
                    letterText += p.textContent.trim() + '\n\n';
                });
                
                // Agregar la firma
                const signature = letterContent.querySelector('.signature');
                if (signature) {
                    letterText += signature.textContent.trim();
                }
            } else {
                letterText = 'No se pudo extraer el contenido de la carta.';
            }

            // Configurar texto del contenido
            doc.setFontSize(12);
            doc.setTextColor(74, 74, 74); // Color gris para el texto

            // Dividir el texto en líneas que se ajusten al ancho de la página
            const lines = doc.splitTextToSize(letterText, maxWidth);
            
            let currentY = 55;
            const lineHeight = 7;

            // Agregar cada línea del texto
            lines.forEach((line, index) => {
                // Verificar si necesitamos una nueva página
                if (currentY > pageHeight - margin) {
                    doc.addPage();
                    currentY = margin;
                }
                
                doc.text(line, margin, currentY);
                currentY += lineHeight;
            });

            // Agregar decoración al final (fija)
            currentY += 10;
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.setFontSize(16);
            doc.text('Para siempre en tu corazón', pageWidth / 2, currentY, { align: 'center' });

            // Agregar fecha
            const currentDate = new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text(`Carta guardada el ${currentDate}`, pageWidth / 2, pageHeight - 15, { align: 'center' });

            // Descargar el PDF
            downloadBtn.innerHTML = '✅ ¡Descargando!';
            doc.save('Carta_Especial_para_Valeria.pdf');
            
            // Restaurar el botón después de un momento
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error al generar PDF:', error);
            downloadAsTextFile();
        }
    }, 500);
}

// Función alternativa para descargar como archivo de texto
function downloadAsTextFile() {
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.innerHTML;
    
    try {
        downloadBtn.innerHTML = '📝 Descargando como texto...';
        
        // Extraer el título del HTML
        const letterHeader = document.querySelector('.letter-header h2');
        const title = letterHeader ? letterHeader.textContent : '💌 Carta Especial para Valeria 💌';
        
        // Extraer el contenido de la carta del HTML
        const letterContent = document.querySelector('.letter-content');
        let mainContent = '';
        
        if (letterContent) {
            // Obtener todos los párrafos excepto la firma
            const paragraphs = letterContent.querySelectorAll('p:not(.signature)');
            paragraphs.forEach(p => {
                mainContent += p.textContent.trim() + '\n\n';
            });
            
            // Agregar la firma
            const signature = letterContent.querySelector('.signature');
            if (signature) {
                mainContent += signature.textContent.trim();
            }
        } else {
            mainContent = 'No se pudo extraer el contenido de la carta.';
        }
        
        const letterTextFile = `
╔══════════════════════════════════════════════════╗
║            ${title}            ║
╚══════════════════════════════════════════════════╝

${mainContent}

──────────────────────────────────────────────────
💖 Para siempre en tu corazón 💖

Carta guardada el ${new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})}
──────────────────────────────────────────────────
        `;

        // Crear el archivo de texto
        const blob = new Blob([letterTextFile], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Carta Valeria.txt';
        
        // Simular clic para descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        downloadBtn.innerHTML = '✅ ¡Descargado como texto!';
        
        // Restaurar el botón
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error al crear archivo de texto:', error);
        alert('Hubo un problema al descargar la carta. Por favor, copia el texto manualmente.');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}