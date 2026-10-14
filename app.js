// ============================================================================
// AGENTES DE LUZ 2026 - INVITATION, REGISTRATION & DUAL WHATSAPP ENGINE
// ============================================================================

const TARGET_WHATSAPP_PRIMARY = '529981677617';   // 998 167 7617
const TARGET_WHATSAPP_SECONDARY = '529983407244'; // 998 340 7244
const STORAGE_KEY = 'agentes_de_luz_registros_2026';

// 1. COUNTDOWN TIMER (30 Octubre 2026, 5:30 PM)
function initCountdown() {
  const eventDate = new Date('2026-10-30T17:30:00-05:00');

  function update() {
    const now = new Date();
    const diff = eventDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// 2. DYNAMIC KIDS FORM LIST
let kidCounter = 0;

function createKidEntry(index, name = '', age = '7', allergies = 'Ninguna') {
  const div = document.createElement('div');
  div.className = 'kid-entry-card';
  div.dataset.kidId = index;

  div.innerHTML = `
    <div class="kid-card-header">
      <span class="kid-badge">⭐ Agente #${index + 1}</span>
      ${index > 0 ? `<button type="button" class="remove-kid-btn" onclick="removeKidEntry(${index})">✕ Quitar niño</button>` : ''}
    </div>
    <div class="kid-grid">
      <div>
        <label class="form-label" for="kid-name-${index}">Nombre del Niño(a) <span class="req">*</span></label>
        <input type="text" id="kid-name-${index}" class="form-input kid-name" placeholder="Ej. Mateo o Sofía" value="${name}" required />
      </div>
      <div>
        <label class="form-label" for="kid-age-${index}">Edad</label>
        <select id="kid-age-${index}" class="form-select kid-age">
          ${[...Array(15).keys()].map(i => {
            const ageVal = i + 1;
            return `<option value="${ageVal}" ${ageVal == age ? 'selected' : ''}>${ageVal} años</option>`;
          }).join('')}
        </select>
      </div>
    </div>
    <div>
      <label class="form-label" for="kid-care-${index}">Alergias o Cuidados Especiales</label>
      <input type="text" id="kid-care-${index}" class="form-input kid-allergies" placeholder="Ej. Ninguna, Lácteos, Cacahuate, Asma..." value="${allergies}" />
      <div class="allergy-chips">
        <button type="button" class="chip-btn ${allergies.includes('Ninguna') ? 'selected' : ''}" onclick="applyChip(this, 'Ninguna')">✅ Ninguna</button>
        <button type="button" class="chip-btn ${allergies.includes('Lácteos') ? 'selected' : ''}" onclick="applyChip(this, 'Lácteos')">🥛 Lácteos</button>
        <button type="button" class="chip-btn ${allergies.includes('Cacahuate') ? 'selected' : ''}" onclick="applyChip(this, 'Cacahuate / Maní')">🥜 Cacahuate</button>
        <button type="button" class="chip-btn ${allergies.includes('Gluten') ? 'selected' : ''}" onclick="applyChip(this, 'Gluten')">🌾 Gluten</button>
        <button type="button" class="chip-btn ${allergies.includes('Huevo') ? 'selected' : ''}" onclick="applyChip(this, 'Huevo')">🥚 Huevo</button>
        <button type="button" class="chip-btn ${allergies.includes('Asma') ? 'selected' : ''}" onclick="applyChip(this, 'Asma')">🫁 Asma</button>
      </div>
    </div>
  `;
  return div;
}

function applyChip(btn, value) {
  const card = btn.closest('.kid-entry-card');
  const input = card.querySelector('.kid-allergies');

  if (value === 'Ninguna') {
    input.value = 'Ninguna';
    card.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    return;
  }

  let current = input.value.replace(/Ninguna,?\s*/gi, '').trim();
  const chipSelected = btn.classList.contains('selected');

  if (chipSelected) {
    btn.classList.remove('selected');
    current = current.split(',').map(s => s.trim()).filter(s => s && s !== value).join(', ');
  } else {
    btn.classList.add('selected');
    current = current ? `${current}, ${value}` : value;
    const noneBtn = card.querySelector('.chip-btn:first-child');
    if (noneBtn) noneBtn.classList.remove('selected');
  }

  input.value = current || 'Ninguna';
}

function addKid() {
  const container = document.getElementById('kids-list-container');
  if (!container) return;
  const newKidEl = createKidEntry(kidCounter);
  container.appendChild(newKidEl);
  kidCounter++;
  updateKidBadges();
}

function removeKidEntry(id) {
  const card = document.querySelector(`.kid-entry-card[data-kid-id="${id}"]`);
  if (card) {
    card.remove();
    updateKidBadges();
  }
}

function updateKidBadges() {
  const cards = document.querySelectorAll('.kid-entry-card');
  cards.forEach((card, idx) => {
    const badge = card.querySelector('.kid-badge');
    if (badge) badge.textContent = `⭐ Agente #${idx + 1}`;
  });
}

// 3. STORAGE & REGISTRATION LOGIC
function getSavedRegistrations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const records = data ? JSON.parse(data) : [];
    return Array.isArray(records) ? records : [];
  } catch (e) {
    return [];
  }
}

function saveRegistration(reg) {
  const list = getSavedRegistrations();
  list.push(reg);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

// 4. SUBMIT RSVP
function handleRsvpSubmit(e) {
  e.preventDefault();

  const tutorName = document.getElementById('tutor-name').value.trim();
  const tutorPhone = document.getElementById('tutor-phone').value.trim();
  const notes = document.getElementById('tutor-notes')?.value.trim() || '';

  if (!tutorName || !tutorPhone) {
    alert('Por favor escribe tu nombre y teléfono celular.');
    return;
  }

  if (tutorPhone.replace(/\D/g, '').length < 10) {
    const phone = document.getElementById('tutor-phone');
    phone.setCustomValidity('Escribe un teléfono de al menos 10 dígitos.');
    phone.reportValidity();
    return;
  }

  const kidCards = document.querySelectorAll('.kid-entry-card');
  const kids = [];

  kidCards.forEach(card => {
    const name = card.querySelector('.kid-name').value.trim();
    const age = card.querySelector('.kid-age').value;
    const allergies = card.querySelector('.kid-allergies').value.trim() || 'Ninguna';
    if (name) {
      kids.push({ name, age, allergies });
    }
  });

  if (kids.length === 0) {
    alert('Por favor agrega el nombre de al menos un niño(a).');
    return;
  }

  const uuidPart = (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID().slice(0, 8).toUpperCase()
    : Math.random().toString(36).substring(2, 10).toUpperCase();

  const missionId = 'AGL-' + uuidPart;
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
                  now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

  const record = {
    id: missionId,
    timestamp: dateStr,
    tutor: tutorName,
    phone: tutorPhone,
    notes: notes,
    kidsCount: kids.length,
    kids: kids
  };

  saveRegistration(record);
  showSuccessModal(record);
}

// 5. SUCCESS MODAL & DUAL WHATSAPP CONFIRMATION (998 167 7617 & 998 340 7244)
function showSuccessModal(record) {
  const modal = document.getElementById('pass-modal');
  const mainApp = document.getElementById('main-app');

  document.getElementById('modal-pass-id').textContent = '#' + record.id;
  document.getElementById('modal-tutor-name').textContent = record.tutor;
  document.getElementById('modal-kids-count').textContent = record.kidsCount + (record.kidsCount === 1 ? ' niño' : ' niños');

  const kidsListHtml = record.kids.map((k, i) => `
    <div style="margin-bottom: 6px; padding-left: 10px; border-left: 3px solid #ffb703;">
      <strong>${i + 1}. ${escapeHtml(k.name)}</strong> (${k.age} años) <br>
      <span style="font-size: 0.8rem; color: #cbd5e1;">Alergias/Cuidados: <em>${escapeHtml(k.allergies)}</em></span>
    </div>
  `).join('');
  document.getElementById('modal-kids-details').innerHTML = kidsListHtml;

  // Generate QR Code with QRious
  try {
    if (typeof QRious !== 'undefined') {
      new QRious({
        element: document.getElementById('pass-qr'),
        value: `AGENTES-DE-LUZ-2026|${record.id}|${record.tutor}|${record.kidsCount}NINOS`,
        size: 110,
        background: '#ffffff',
        foreground: '#0b2545',
        level: 'H'
      });
    }
  } catch (e) {
    console.error('Error generating QR', e);
  }

  // Format WhatsApp Message
  const kidsWaText = record.kids.map((k, i) => `${i + 1}. *${k.name}* (${k.age} años) - Alergias: ${k.allergies}`).join('\n');
  const waMessage =
`🌟 *CONFIRMACIÓN DE ASISTENCIA - AGENTES DE LUZ* 🌟
🏰 *Niños del Rey - Castillo del Rey Cancún*

¡Hola! Queremos registrar a nuestra familia:
👤 *Papá / Mamá / Tutor:* ${record.tutor}
📱 *Teléfono:* ${record.phone}
${record.notes ? `📝 *Comentarios:* ${record.notes}\n` : ''}👶 *Pequeños agentes (${record.kidsCount}):*
${kidsWaText}

🎟️ *Código de Pase:* #${record.id}
📅 *Fecha:* Viernes 30 de Octubre 2026, 5:30 p.m.
📍 *Lugar:* Castillo del Rey Cancún (Av. Fonatur casi esq. Prol. La Luna)
🗺️ *Mapa:* https://maps.app.goo.gl/UWj3HBc5RHsMQqDD9
✨ *¡Listos para ser Agentes de Luz!*`;

  const encodedText = encodeURIComponent(waMessage);
  const waBtn1 = document.getElementById('whatsapp-confirm-link-1');
  const waBtn2 = document.getElementById('whatsapp-confirm-link-2');

  if (waBtn1) {
    waBtn1.href = `https://wa.me/${TARGET_WHATSAPP_PRIMARY}?text=${encodedText}`;
  }
  if (waBtn2) {
    waBtn2.href = `https://wa.me/${TARGET_WHATSAPP_SECONDARY}?text=${encodedText}`;
  }

  if (modal) modal.classList.add('active');
  if (mainApp) mainApp.inert = true;
  document.body.classList.add('modal-open');
  if (waBtn1) waBtn1.focus();

  // Trigger celebration confetti
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 110,
      origin: { y: 0.6 }
    });
  }
}

function closeModal() {
  const modal = document.getElementById('pass-modal');
  const mainApp = document.getElementById('main-app');
  if (modal) modal.classList.remove('active');
  if (mainApp) mainApp.inert = false;
  document.body.classList.remove('modal-open');
  const submitBtn = document.querySelector('.complete-enrollment-btn');
  if (submitBtn) submitBtn.focus();
}

// 6. EXCEL (.XLSX) EXPORT WITH SHEETJS
function exportRegistrationsToExcel() {
  const records = getSavedRegistrations();

  if (records.length === 0) {
    alert('Aún no hay registros guardados en este dispositivo. Completa un registro para generar el Excel.');
    return;
  }

  if (typeof XLSX === 'undefined') {
    alert('La librería de Excel se está cargando. Intenta de nuevo en unos segundos.');
    return;
  }

  const familiesData = records.map(r => {
    const kidsSummary = r.kids.map(k => `${k.name} (${k.age}a) [${k.allergies}]`).join('; ');
    return {
      'Folio': r.id,
      'Fecha Registro': r.timestamp,
      'Tutor / Papá': r.tutor,
      'Teléfono WhatsApp': r.phone,
      'Cant. Niños': r.kidsCount,
      'Detalle Niños': kidsSummary,
      'Notas': r.notes || ''
    };
  });

  const kidsData = [];
  records.forEach(r => {
    r.kids.forEach(k => {
      const hasAllergy = k.allergies.toLowerCase() !== 'ninguna' && k.allergies.trim() !== '';
      kidsData.push({
        'Folio': r.id,
        'Nombre del Niño(a)': k.name,
        'Edad': k.age + ' años',
        'Tiene Alergia': hasAllergy ? '⚠️ SÍ' : 'NO',
        'Alergias / Cuidados': k.allergies,
        'Tutor': r.tutor,
        'Teléfono': r.phone
      });
    });
  });

  const wb = XLSX.utils.book_new();
  const wsFamilies = XLSX.utils.json_to_sheet(familiesData);
  const wsKids = XLSX.utils.json_to_sheet(kidsData);

  XLSX.utils.book_append_sheet(wb, wsFamilies, 'Familias Registradas');
  XLSX.utils.book_append_sheet(wb, wsKids, 'Niños y Alergias');

  XLSX.writeFile(wb, 'Registros_Agentes_de_Luz_2026.xlsx');
}

// 7. CALENDAR (GOOGLE CALENDAR)
function addToCalendar() {
  const title = 'Agentes de Luz: Grandes Personajes de la Biblia';
  const desc = 'Una tarde llena de sorpresas, música, diversión y Palabra de Dios. ¡Conoce nuevos amigos y conoce más de Jesús! En Niños del Rey - Castillo del Rey Cancún.';
  const loc = 'Av. Fonatur casi esquina con Prolongación La Luna, Cancún, Q. Roo';
  const start = '20261030T223000Z';
  const end = '20261031T013000Z';

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
  window.open(gcalUrl, '_blank');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

// 8. INITIALIZE EVERYTHING & SCROLL REVEAL OBSERVER
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  addKid();

  const addKidBtn = document.getElementById('add-kid-btn');
  if (addKidBtn) addKidBtn.addEventListener('click', addKid);

  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) rsvpForm.addEventListener('submit', handleRsvpSubmit);

  const exportBtn1 = document.getElementById('export-excel-btn');
  const exportBtn2 = document.getElementById('export-excel-btn-footer');
  if (exportBtn1) exportBtn1.addEventListener('click', exportRegistrationsToExcel);
  if (exportBtn2) exportBtn2.addEventListener('click', exportRegistrationsToExcel);

  const calBtn = document.getElementById('add-calendar-btn');
  if (calBtn) calBtn.addEventListener('click', addToCalendar);

  const closeModalBtn = document.getElementById('close-modal-btn');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  const phoneInput = document.getElementById('tutor-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', e => e.target.setCustomValidity(''));
  }

  // Modal keyboard accessibility
  document.addEventListener('keydown', e => {
    const modal = document.getElementById('pass-modal');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
  });

  // Scroll-Reveal Animation Observer for all .reveal-item elements
  const revealEls = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach((el, idx) => {
      el.style.setProperty('--delay', `${(idx % 4) * 70}ms`);
      observer.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
});
