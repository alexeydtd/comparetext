function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#39;");
}

function compareByFragments() {
  const templateText = document.getElementById("templateText").value || "";
  const text2 = document.getElementById("text2").value || "";

  if (!templateText.trim()) { alert("Введите шаблон!"); return; }
  if (!text2.trim()) { alert("Введите текст для проверки!"); return; }

  // Разбиваем шаблон на фрагменты (по пробелам)
  const fragments = templateText
    .split(/\s+/)
    .filter(f => f.length > 0)
    .sort((a,b) => b.length - a.length); // Сортируем по длине, чтобы большие совпадения первыми

  let highlighted = '';
  let i = 0;

  while (i < text2.length) {
    let matched = false;

    // Проходим по каждому фрагменту
    for (let frag of fragments) {
      if (text2.substr(i, frag.length).toLowerCase() === frag.toLowerCase()) {
        highlighted += '<span class="highlight">' + escapeHtml(text2.substr(i, frag.length)) + '</span>';
        i += frag.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      highlighted += escapeHtml(text2[i]);
      i++;
    }
  }

  document.getElementById("preview").innerHTML = highlighted;
}

// Кнопки
document.getElementById("btnCompare").addEventListener("click", compareByFragments);
document.getElementById("btnClear").addEventListener("click", function() {
  document.getElementById("templateText").value = "";
  document.getElementById("text2").value = "";
  document.getElementById("preview").innerHTML = "";
}); 
