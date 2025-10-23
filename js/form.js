document.addEventListener("DOMContentLoaded", function () {
  var orig = document.getElementById("wf-form-Contact-Us");
  if (!orig) return;

  // Настройки Netlify
  orig.setAttribute("method", "POST");
  orig.setAttribute("data-netlify", "true");

  // Добавляем скрытое поле form-name (если нет)
  if (!orig.querySelector('input[name="form-name"]')) {
    var hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "form-name";
    hidden.value =
      orig.getAttribute("name") ||
      orig.getAttribute("data-name") ||
      "Contact Us";
    orig.appendChild(hidden);
  }

  // Клонируем форму (убираем обработчики Webflow)
  var clone = orig.cloneNode(true);
  orig.parentNode.replaceChild(clone, orig);

  // Находим блоки для вывода сообщений
  var formWrapper = clone.closest(".w-form");
  var formInputs = formWrapper?.querySelector(".inputs");
  var successMessage = formWrapper?.querySelector(".w-form-done");
  var errorMessage = formWrapper?.querySelector(".w-form-fail");

  // Обработчик отправки формы
  clone.addEventListener("submit", function (e) {
    e.preventDefault(); // отключаем стандартное поведение, будем отправлять вручную

    console.log("Submitting form via AJAX to Netlify...");

    // Формируем данные формы
    var formData = new FormData(clone);

    // Добавим обязательное поле для Netlify, если по какой-то причине его нет
    if (!formData.has("form-name")) {
      formData.append(
        "form-name",
        clone.getAttribute("name") || "wf-form-Contact-Us"
      );
    }

    // Скрываем старые сообщения
    if (successMessage) successMessage.style.display = "none";
    if (errorMessage) errorMessage.style.display = "none";

    // Отправляем на Netlify
    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("✅ Form successfully submitted to Netlify!");
          if (successMessage) successMessage.style.display = "block";
          if (formInputs) formInputs.style.display = "none";
          if (errorMessage) errorMessage.style.display = "none";
          clone.reset();
        } else {
          console.error(
            "⚠️ Form submission failed with status:",
            response.status
          );
          if (errorMessage) errorMessage.style.display = "block";
          if (successMessage) successMessage.style.display = "none";
        }
      })
      .catch((error) => {
        console.error("❌ Network error:", error);
        if (errorMessage) errorMessage.style.display = "block";
        if (successMessage) successMessage.style.display = "none";
      });
  });
});
