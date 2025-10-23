document.addEventListener("DOMContentLoaded", function () {
  var orig = document.getElementById("wf-form-Contact-Us");
  if (!orig) return;

  // Убедимся, что Netlify явно включён
  orig.setAttribute("method", "POST");
  orig.setAttribute("data-netlify", "true");

  // Добавим скрытое поле form-name, если его нет
  if (!orig.querySelector('input[name="form-name"]')) {
    var hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "form-name";
    // значение должно совпадать с name формы или data-name
    hidden.value =
      orig.getAttribute("name") ||
      orig.getAttribute("data-name") ||
      "Contact Us";
    orig.appendChild(hidden);
  }

  // Клонируем форму — cloneNode не копирует JS-листенеры
  var clone = orig.cloneNode(true);

  // Обновим кнопку submit, чтобы показать "ожидание" стандартное поведение Netlify
  // (необязательно)
  var submitBtn = clone.querySelector(
    'input[type="submit"], button[type="submit"]'
  );
  if (submitBtn && submitBtn.dataset.wait) {
    // оставим как есть или можно изменить
  }

  // Заменим старую форму на клонированную (это снимает все JS-listener'ы)
  orig.parentNode.replaceChild(clone, orig);

  // (Опционально) Добавим кастомную проверку/обработчик, если нужно:
  clone.addEventListener("submit", function (e) {
    // не вызываем e.preventDefault() — позволяем браузеру отправить POST на тот же URL
    // если нужен ajax — сюда можно писать fetch к Netlify Forms endpoint
    // например, можно показать индикатор отправки
    console.log("Submitting native form to Netlify...");
  });
});
