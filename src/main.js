import './style.css'
import { PLAYER_1, PLAYER_2, STATUS, SYSTEM } from "@rcade/plugin-input-classic";
import { PLAYER_1 as SPINNER_P1, PLAYER_2 as SPINNER_P2, STATUS as SPINNER_STATUS } from "@rcade/plugin-input-spinners";

// Create display container
const container = document.createElement('div');
container.id = 'input-display';
container.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 8px;
  padding: 3px;
  z-index: 9999;
  line-height: 1.0;
  overflow: auto;
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
      html += `${spaces}${key}: {`;
      html += formatObject(value, indent + 1);
      html += `}\n`;
    } else {
      html += `${spaces}${key}: ${formatBool(value)} `;
    }
  }

  return html;
}

let SPINNER_P1_DELTA_TOTAL = 0;
let SPINNER_P2_DELTA_TOTAL = 0;

// Update display every frame
function updateDisplay() {
  // Reset knobs when both start buttons are pressed simultaneously
  if (SYSTEM.ONE_PLAYER && SYSTEM.TWO_PLAYER) {
    SPINNER_P1.SPINNER.reset();
    SPINNER_P2.SPINNER.reset();

    SPINNER_P1_DELTA_TOTAL = 0;
    SPINNER_P2_DELTA_TOTAL = 0;
  }

  const spinner_P1 = SPINNER_P1.SPINNER;
  const delta_P1 = spinner_P1.step_delta;
  SPINNER_P1_DELTA_TOTAL += delta_P1;

  const DEBUG_SPINNER_P1 = {
    delta: delta_P1,
    total_d: SPINNER_P1_DELTA_TOTAL,
    angle_16: SPINNER_P1_DELTA_TOTAL / 16,
    angle_64: SPINNER_P1_DELTA_TOTAL / 64,
    angle_512: SPINNER_P1_DELTA_TOTAL / 512,
    angle_1024: SPINNER_P1_DELTA_TOTAL / 1024,
    angle: spinner_P1.angle,
  }

  const spinner_P2 = SPINNER_P2.SPINNER;
  const delta_P2 = spinner_P2.step_delta;
  SPINNER_P2_DELTA_TOTAL += delta_P2;

  const DEBUG_SPINNER_P2 = {
    delta: delta_P2,
    total_d: SPINNER_P2_DELTA_TOTAL,
    angle_16: SPINNER_P2_DELTA_TOTAL / 16,
    angle_64: SPINNER_P2_DELTA_TOTAL / 64,
    angle_512: SPINNER_P2_DELTA_TOTAL / 512,
    angle_1024: SPINNER_P2_DELTA_TOTAL / 1024,
    angle: spinner_P2.angle,
  }

  //16,64,512,1024

  container.innerHTML = `
<div style="margin-bottom: 1px; border-bottom: 1px solid #0f0; padding-bottom: 1px;">
  <strong style="color: #fff;">STATUS</strong> <span>${formatObject(STATUS)}</span>
</div>
<div style="margin-bottom: 1px; border-bottom: 1px solid #0f0; padding-bottom: 1px;">
  <strong style="color: #fff;">SYSTEM</strong> <span>${formatObject(SYSTEM)}</span>
</div>
<div style="margin-bottom: 1px; border-bottom: 1px solid #0f0; padding-bottom: 1px;">
  <strong style="color: #fff;">P1</strong> <span>${formatObject(PLAYER_1)}</span>
</div>
<div style="margin-bottom: 1px; border-bottom: 1px solid #0f0; padding-bottom: 1px;">
  <strong style="color: #fff;">P2</strong> <span>${formatObject(PLAYER_2)}</span>
</div>
<div style="margin-bottom: 1px; border-bottom: 1px solid #0f0; padding-bottom: 1px;">
  <strong style="color: #fff;">SPINNERS</strong> <span>${formatObject(SPINNER_STATUS)}</span>
</div>
<div style="margin-bottom: 1px; border-bottom: 1px solid #0f0; padding-bottom: 1px;">
  <strong style="color: #fff;">SPINNER P1</strong> <span>${formatObject(DEBUG_SPINNER_P1)}</span>
</div>
<div style="margin-bottom: 1px; border-bottom: 1px solid #0f0; padding-bottom: 1px;">
  <strong style="color: #fff;">SPINNER P2</strong> <span>${formatObject(DEBUG_SPINNER_P2)}</span>
</div>
<div style="margin-top: 3px; padding: 2px; background: ${SYSTEM.ONE_PLAYER && SYSTEM.TWO_PLAYER ? '#ff0' : '#333'}; color: ${SYSTEM.ONE_PLAYER && SYSTEM.TWO_PLAYER ? '#000' : '#0f0'}; text-align: center;">
  ${SYSTEM.ONE_PLAYER && SYSTEM.TWO_PLAYER ? 'RESETTING KNOBS' : 'Press both START to reset knobs'}
</div>
  `.trim();

  requestAnimationFrame(updateDisplay);
}

// Start the display loop
updateDisplay();