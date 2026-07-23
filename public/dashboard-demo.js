(function () {
  var dot = document.getElementById('alert-dot');
  var newLead = document.getElementById('new-lead');
  var statCalls = document.getElementById('stat-calls');
  var statQualified = document.getElementById('stat-qualified');
  if (!dot || !newLead) return;

  function showLead() {
    dot.style.animation = 'pulse-dot 1s ease-in-out infinite';
    newLead.style.opacity = '1';
    newLead.style.transform = 'translateY(0)';
    if (statCalls) statCalls.textContent = '13';
    if (statQualified) statQualified.textContent = '9';
  }

  function hideLead() {
    dot.style.animation = '';
    newLead.style.opacity = '0';
    newLead.style.transform = 'translateY(8px)';
    if (statCalls) statCalls.textContent = '12';
    if (statQualified) statQualified.textContent = '8';
    setTimeout(showLead, 2000);
  }

  setTimeout(showLead, 2000);
  setTimeout(hideLead, 6000);
})();
