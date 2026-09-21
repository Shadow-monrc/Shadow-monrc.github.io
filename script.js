/*
  EASY UPDATE FILE
  ----------------
  You should only need to edit this file when adding content.

  NOTES:
    - Put PDFs in assets/notes/
    - Add one object to the notes array below.
    - Set featured: true for the 4–5 notes you want shown in the illustrated room.

  PUBLICATIONS:
    - Put PDFs in assets/papers/
    - Add one object to the publications array below.
    - The newest paper can be marked featured: true.

  The rooms stay visually uncluttered no matter how many items you add.
*/

const notes = [
  {
    id: "generalized-symmetries",
    title: "Generalized Symmetries",
    category: "Quantum Field Theory",
    description: "Higher-form symmetries, non-invertible symmetries, anomalies, topological operators, and related ideas in QFT.",
    pdf: "assets/notes/generalized-symmetries.pdf",
    featured: true
  },
  {
    id: "2d-cft",
    title: "2D Conformal Field Theory",
    category: "Conformal Field Theory",
    description: "Virasoro symmetry, primary operators, BPZ, minimal models, Kac determinants, and related topics.",
    pdf: "assets/notes/2d-cft.pdf",
    featured: true
  },
  {
    id: "kac-moody",
    title: "Kac–Moody Algebras",
    category: "Conformal Field Theory",
    description: "Affine Lie algebras, current algebras, representations, and their appearance in two-dimensional CFT.",
    pdf: "assets/notes/kac-moody.pdf",
    featured: true
  },
  {
    id: "tdls-minimal-models",
    title: "TDLs & Minimal Models",
    category: "Generalized Symmetry",
    description: "Topological defect lines, fusion, minimal models, RG flows, and surviving defects under deformations.",
    pdf: "assets/notes/tdls-minimal-models.pdf",
    featured: true
  },
  {
    id: "qft-basics",
    title: "Quantum Field Theory",
    category: "Quantum Field Theory",
    description: "General QFT notes: symmetries, anomalies, gauge theory, path integrals, and concepts encountered while studying high-energy theory.",
    pdf: "assets/notes/qft-basics.pdf",
    featured: false
  }
];

const publications = [
  {
    id: "photon-jet",
    title: "Transverse Single Spin Asymmetries in Back-to-Back Photon + Jet Production",
    year: "2025",
    authors: "Aman Gupta, et al.",
    description: "Study of transverse single-spin asymmetries in back-to-back photon + jet production, with emphasis on the gluon Sivers function.",
    pdf: "assets/papers/photon-jet.pdf",
    arxiv: "https://arxiv.org/abs/2503.10682",
    featured: true
  }
];

const projects = [
  {
    number: "01",
    title: "Photon + Jet",
    description: "Transverse single spin asymmetries and the Gluon Sivers Function in back-to-back photon + jet production.",
    link: "#publications"
  },
  {
    number: "02",
    title: "Generalized Symmetries",
    description: "Exploring non-invertible symmetries, topological defects, and their role in quantum field theory and conformal field theory.",
    link: "#notes"
  },
  {
    number: "03",
    title: "NLO Drell–Yan",
    description: "Computational work involving perturbative QCD and numerical integration.",
    link: "#"
  }
];

const noteModal = document.getElementById("noteModal");
const paperModal = document.getElementById("paperModal");
const archiveModal = document.getElementById("archiveModal");

const featuredNotes = notes.filter(note => note.featured).slice(0, 4);
const noteWall = document.getElementById("noteWall");

const noteStyles = ["large", "", "blue", "pale"];
featuredNotes.forEach((note, index) => {
  const card = document.createElement("button");
  card.className = `note-card ${noteStyles[index] || ""}`;
  card.dataset.note = note.id;
  card.innerHTML = `
    <span class="pin"></span>
    <span class="note-type">${escapeHtml(note.category).toUpperCase()}</span>
    <strong>${escapeHtml(note.title)}</strong>
    <small>${escapeHtml(note.description)}</small>
    <span class="open-label">open →</span>
  `;
  noteWall.appendChild(card);
});

document.querySelectorAll("[data-note]").forEach(card => {
  card.addEventListener("click", () => openNote(card.dataset.note));
});

function openNote(id) {
  const note = notes.find(item => item.id === id);
  if (!note) return;
  document.getElementById("noteType").textContent = note.category.toUpperCase();
  document.getElementById("noteTitle").textContent = note.title;
  document.getElementById("noteDescription").textContent = note.description;
  document.getElementById("notePdf").href = note.pdf;
  noteModal.classList.add("open");
  noteModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function openNotesArchive() {
  document.getElementById("archiveEyebrow").textContent = "NOTES · ARCHIVE";
  document.getElementById("archiveTitle").textContent = "Everything I've been learning.";
  renderNoteArchive();
  archiveModal.classList.add("open");
  archiveModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function renderNoteArchive() {
  const container = document.getElementById("archiveList");
  container.innerHTML = "";
  const groups = {};
  notes.forEach(note => {
    if (!groups[note.category]) groups[note.category] = [];
    groups[note.category].push(note);
  });

  Object.entries(groups).forEach(([category, items]) => {
    const group = document.createElement("section");
    group.className = "archive-group";
    group.innerHTML = `<h3>${escapeHtml(category)}</h3>`;
    const list = document.createElement("div");
    list.className = "archive-items";
    items.forEach(note => {
      const item = document.createElement("button");
      item.className = "archive-item";
      item.innerHTML = `
        <span class="archive-item-title">${escapeHtml(note.title)}</span>
        <span class="archive-item-description">${escapeHtml(note.description)}</span>
        <span class="archive-arrow">↗</span>
      `;
      item.addEventListener("click", () => {
        closeModal("archiveModal");
        openNote(note.id);
      });
      list.appendChild(item);
    });
    group.appendChild(list);
    container.appendChild(group);
  });
}

document.getElementById("viewAllNotes").addEventListener("click", openNotesArchive);

// Publications: the desk monitor opens the complete publication archive.
document.getElementById("paperMonitor").addEventListener("click", openPublicationArchive);

document.getElementById("featuredPaperButton").addEventListener("click", () => {
  const featured = publications.find(paper => paper.featured) || publications[0];
  if (featured) openPaper(featured.id);
});

function openPublicationArchive() {
  document.getElementById("archiveEyebrow").textContent = "RESEARCH · ARCHIVE";
  document.getElementById("archiveTitle").textContent = "Papers, preprints, and research work.";
  renderPublicationArchive();
  archiveModal.classList.add("open");
  archiveModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function renderPublicationArchive() {
  const container = document.getElementById("archiveList");
  container.innerHTML = "";
  const sorted = [...publications].sort((a, b) => Number(b.year) - Number(a.year));
  const years = [...new Set(sorted.map(paper => paper.year))];

  years.forEach(year => {
    const group = document.createElement("section");
    group.className = "archive-group";
    group.innerHTML = `<h3>${escapeHtml(year)}</h3>`;
    const list = document.createElement("div");
    list.className = "archive-items";
    sorted.filter(paper => paper.year === year).forEach(paper => {
      const item = document.createElement("button");
      item.className = "archive-item";
      item.innerHTML = `
        <span class="archive-item-title">${escapeHtml(paper.title)}</span>
        <span class="archive-item-description">${escapeHtml(paper.authors)}</span>
        <span class="archive-arrow">↗</span>
      `;
      item.addEventListener("click", () => {
        closeModal("archiveModal");
        openPaper(paper.id);
      });
      list.appendChild(item);
    });
    group.appendChild(list);
    container.appendChild(group);
  });
}

function openPaper(id) {
  const paper = publications.find(item => item.id === id);
  if (!paper) return;
  document.getElementById("paperYear").textContent = `${paper.year} · PUBLICATION`;
  document.getElementById("paperTitle").textContent = paper.title;
  document.getElementById("paperAuthors").textContent = paper.authors;
  document.getElementById("paperDescription").textContent = paper.description;
  document.getElementById("arxivLink").href = paper.arxiv || "#";
  document.getElementById("paperPdf").href = paper.pdf;
  paperModal.classList.add("open");
  paperModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});

document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
  backdrop.addEventListener("click", () => closeModal(backdrop.parentElement.id));
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.open").forEach(modal => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "";
  }
});

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

const projectGrid = document.getElementById("projectGrid");
projects.forEach(project => {
  const article = document.createElement("article");
  article.className = "project-card";
  article.innerHTML = `
    <span class="number">${project.number}</span>
    <h3>${escapeHtml(project.title)}</h3>
    <p>${escapeHtml(project.description)}</p>
    <a href="${project.link}">explore →</a>
  `;
  projectGrid.appendChild(article);
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Highlight the current section in the navbar.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { threshold: 0.45 });
sections.forEach(section => observer.observe(section));
