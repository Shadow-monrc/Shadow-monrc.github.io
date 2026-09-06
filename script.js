/*
  EASY UPDATE FILE
  ----------------
  Most of the content you will change regularly lives here.

  1. Add/update notes in the "notes" object.
  2. Add/update projects in "projects".
  3. Put your PDFs inside /assets and update the paths.
  4. Put your arXiv URL in publication.arxiv.
*/

const notes = {
  cft: {
    title: "2D Conformal Field Theory",
    description: "Notes on 2D CFT, Virasoro symmetry, primary operators, minimal models, modularity, and related topics.",
    pdf: "assets/notes-cft.pdf"
  },
  symmetry: {
    title: "Generalized Symmetries",
    description: "A growing collection of notes on higher-form symmetries, non-invertible symmetries, anomalies, and generalized symmetry in QFT.",
    pdf: "assets/notes-generalized-symmetries.pdf"
  },
  km: {
    title: "Kac–Moody Algebras",
    description: "Personal notes on affine Lie algebras, current algebras, representations, and their appearance in 2D CFT.",
    pdf: "assets/notes-kac-moody.pdf"
  },
  tdl: {
    title: "TDLs & Minimal Models",
    description: "Notes on topological defect lines, fusion, minimal models, RG flows, and surviving defects under deformations.",
    pdf: "assets/notes-tdl.pdf"
  },
  qft: {
    title: "Quantum Field Theory",
    description: "General QFT notes: symmetries, anomalies, gauge theory, and concepts encountered while studying high-energy theory.",
    pdf: "assets/notes-qft.pdf"
  }
};

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

const publication = {
  arxiv: "https://arxiv.org/",
  pdf: "assets/paper.pdf"
};

const noteModal = document.getElementById("noteModal");
const paperModal = document.getElementById("paperModal");

document.querySelectorAll("[data-note]").forEach(card => {
  card.addEventListener("click", () => {
    const note = notes[card.dataset.note];
    if (!note) return;

    document.getElementById("noteTitle").textContent = note.title;
    document.getElementById("noteDescription").textContent = note.description;
    document.getElementById("notePdf").href = note.pdf;

    noteModal.classList.add("open");
    noteModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document.getElementById("paperMonitor").addEventListener("click", () => {
  document.getElementById("arxivLink").href = publication.arxiv;
  document.getElementById("paperPdf").href = publication.pdf;

  paperModal.classList.add("open");
  paperModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});

document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
  backdrop.addEventListener("click", () => {
    backdrop.parentElement.classList.remove("open");
    document.body.style.overflow = "";
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.open").forEach(modal => modal.classList.remove("open"));
    document.body.style.overflow = "";
  }
});

function closeModal(id) {
  const modal = document.getElementById(id);
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
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <a href="${project.link}">explore →</a>
  `;
  projectGrid.appendChild(article);
});

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
