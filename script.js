function submitValues() {
    const input = document.getElementById('inputValues').value;
    const outputDiv = document.getElementById('output');
    const copyBtn = document.getElementById('copyBtn');
  
    outputDiv.textContent = "Processing...";
    copyBtn.style.display = "none";
  
    fetch('http://localhost:5000/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: input })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          outputDiv.textContent = data.result;
          copyBtn.style.display = "inline-block";
        } else {
          outputDiv.textContent = data.error;
        }
      })
      .catch(err => {
        outputDiv.textContent = 'Error: ' + err.message;
      });
  }
  
  function copyOutput() {
    const outputText = document.getElementById('output').textContent;
  
    // Create a temporary textarea element
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = outputText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // For mobile support
  
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert("Output copied to clipboard!");
      } else {
        alert("Copy command was unsuccessful.");
      }
    } catch (err) {
      alert("Failed to copy: " + err);
    }
  
    document.body.removeChild(tempTextArea);
  }
  
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
  
    const text = document.getElementById('themeText');
    text.textContent = newTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
  }
  