document.addEventListener("DOMContentLoaded", function () {
  var orig = document.getElementById("wf-form-Contact-Us");
  if (!orig) return;

  orig.setAttribute("method", "POST");
  orig.setAttribute("data-netlify", "true");

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

  var clone = orig.cloneNode(true);

  var submitBtn = clone.querySelector(
    'input[type="submit"], button[type="submit"]'
  );
  //if (submitBtn && submitBtn.dataset.wait) {
  //}

  orig.parentNode.replaceChild(clone, orig);

  // (Опционально) Добавим кастомную проверку/обработчик, если нужно:
  clone.addEventListener("submit", function (e) {
    console.log("Submitting native form to Netlify...");
  });
});
