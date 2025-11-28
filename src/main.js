import './style.css'
import { PLAYER_1, PLAYER_2, STATUS, SYSTEM } from "@rcade/plugin-input-classic";

// Create display container
const container = document.createElement('div');
container.id = 'input-display';
container.style.cssText = `
  position: fixed;
  top: 5px;
  left: 5px;
  background: rgba(0, 0, 0, 0.85);
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 8px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #0f0;
  z-index: 9999;
  line-height: 1.2;
  max-width: 310px;
`;
document.body.appendChild(container);

// Format boolean with color
function formatBool(value) {
  const color = value ? '#0f0' : '#666';
  return `<span style="color: ${color}">${value}</span>`;
}

// Format object recursively
function formatObject(obj, indent = 0) {
  const spaces = ' '.repeat(indent);
  let html = '';

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      html += `${spaces}${key}:{`;
      html += formatObject(value, indent + 1);
      html += `}\n`;
    } else {
      html += `${spaces}${key}:${formatBool(value)} `;
    }
  }

  return html;
}

// Update display every frame
function updateDisplay() {
  container.innerHTML = `
<div style="margin-bottom: 3px; border-bottom: 1px solid #0f0; padding-bottom: 2px;">
  <strong style="color: #fff; font-size: 9px;">STATUS</strong>
  <pre style="margin: 2px 0 0 0;">${formatObject(STATUS)}</pre>
</div>

<div style="margin-bottom: 3px; border-bottom: 1px solid #0f0; padding-bottom: 2px;">
  <strong style="color: #fff; font-size: 9px;">SYSTEM</strong>
  <pre style="margin: 2px 0 0 0;">${formatObject(SYSTEM)}</pre>
</div>

<div style="margin-bottom: 3px; border-bottom: 1px solid #0f0; padding-bottom: 2px;">
  <strong style="color: #fff; font-size: 9px;">P1</strong>
  <pre style="margin: 2px 0 0 0;">${formatObject(PLAYER_1)}</pre>
</div>

<div>
  <strong style="color: #fff; font-size: 9px;">P2</strong>
  <pre style="margin: 2px 0 0 0;">${formatObject(PLAYER_2)}</pre>
</div>
  `.trim();

  requestAnimationFrame(updateDisplay);
}

// Start the display loop
updateDisplay();