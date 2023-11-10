function get_calc(btn) {
  if (btn.value == "=") {
    document.dentaku.display.value = eval(document.dentaku.display.value);
  } else if (btn.value == "C") {
    document.dentaku.display.value = "";
  } else {
    if (btn.value == "×") {
      btn.value = "*";
    } else if (btn.value == "÷") {
      btn.value = "/";
    }
    document.dentaku.display.value += btn.value;
    document.dentaku.add_btn.value = "×";
    document.dentaku.div_btn.value = "÷";
  }
}
