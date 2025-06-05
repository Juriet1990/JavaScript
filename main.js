// Test per vedere se ho capito la logica
//if (app) {
//const testoParagrafo = "Questo è un paragrafo!"; // variabile, poi metti la variabile così scrive questo testo
//app.innerHTML = `
//<h1>Questo è un titolo!</h1>
//<p>${testoParagrafo}</p> // ma se lo faccio senza variabili funziona lo stesso... perché!? D:
//<button id="navigateButton">Clicca questo bottone placeholder</button>
//`;
//}
// Ok, funziona!

// In teoria dovrebbe refreshare la pagina e tornare su con ogni refresh... ma in pratica...
window.addEventListener('load', () => {
    if (window.location.hash === '#') {
      history.replaceState(null, null, ' ');
      window.scrollTo(0, 0);
    }
  });  

const app = document.getElementById("app");

if (app) {

    app.innerHTML = `
    <header>
    <nav class="navbar">
    <div class="nav-sinistra">
      <img src="https://via.placeholder.com/40" alt="Logo" class="logo-img" />
      <a href="#" class="logo-text">Sara La Maga</a>
    </div>

      <div class="nav-centro">
        <a href="#scrollspyHeading1">Home</a>
        <a href="#scrollspyHeading2">Chi sono</a>
        <a href="#scrollspyHeading3">Servizi</a>
        <a href="#scrollspyHeading4">Contatti</a>
      </div>

      <div class="nav-social">
        <a href="#"><img src="instagram-icon.svg" alt="Instagram" /></a>
        <a href="#"><img src="linkedin-icon.svg" alt="LinkedIn" /></a>
      </div>
      </nav>
    </header>

    <body>
    <div class="fotoprofilo">
    <div class="cerchio">
    <img src="" alt="" draggable: "none">
    </div>
    </div>

    <section class="home">
      <h2 id="scrollspyHeading1">Home</h2>
      <p>Descrizione pagina</p>
    </section>

    <section class="aboutme">
      <h2 id="scrollspyHeading2">Chi sono</h2>
      <p>Backstory: Sara è una Maga del Regno di Engimorium. Ha studiato presso l'Accademia di Magia magia elementale. 
      Lavora come maga mercenaria, offrendo i suoi servizi e le sue abilità agli avventurieri che hanno bisogno di un mago.</p>
    </section>

    <section class="servizi">
      <h2 id="scrollspyHeading3">Servizi</h2>
      <p>Esempio: tipi di magie conosciute, portali, pozioni, lettura del futuro dalle tazzine di caffè</p>
    </section>

   <section class="contatti">
  <h2 id="scrollspyHeading4">Contatti</h2>
  <form>
    <div class="form-sinistra">
      <input type="text" placeholder="Nome">
      <input type="email" placeholder="Email">
    </div>
    <div class="form-destra">
      <textarea placeholder="Messaggio"></textarea>
      <button type="submit">Invia</button>
    </div>
  </form>
  </section>
  <button id="scrollToTop" title="Torna su">⬆</button>
</body>

 <footer>
  <div class="newsletter">
    <h3>Iscriviti alla newsletter!</h3>
    <div class="newsletter-input">
      <input type="email" placeholder="Inserisci la tua email">
      <button type="submit" class="button">Iscrivimi subito!</button>
    </div>
    <label class="privacy-check">
      <input type="checkbox"> Accetto termini e condizioni
    </label>
  </div>

  <div class="social">
    <a href="#"><img src="instagram-icon.svg" alt="Instagram" /></a>
    <a href="#"><img src="linkedin-icon.svg" alt="LinkedIn" /></a>
  </div>

  <div class="crediti">© 2025 Giulia DM</div>
</footer>

  `;

  document.querySelector('.fotoprofilo').classList.add('glow');

}

const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { 
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('mousemove', e => {
    createStar(e.clientX, e.clientY);
  });
  
  document.addEventListener('click', e => {
    for (let i = 0; i < 10; i++) {
      const offsetX = (Math.random() - 0.5) * 50;
      const offsetY = (Math.random() - 0.5) * 50;
      createStar(e.clientX + offsetX, e.clientY + offsetY);
    }
  });
  
  function createStar(x, y) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    document.body.appendChild(star);
  
    setTimeout(() => {
      star.remove();
    }, 1000);
  }
  
  document.addEventListener('mousemove', e => {
    createGlitter(e.clientX, e.clientY);
  });
  
  document.addEventListener('click', e => {
    for (let i = 0; i < 15; i++) {
      const offsetX = (Math.random() - 0.5) * 60;
      const offsetY = (Math.random() - 0.5) * 60;
      createGlitter(e.clientX + offsetX, e.clientY + offsetY);
    }
  });
  
  const glitterCount = 100;

for (let i = 0; i < glitterCount; i++) {
  const glitter = document.createElement('div');
  glitter.classList.add('glitter');

  glitter.style.left = Math.random() * window.innerWidth + 'px';
  glitter.style.top = Math.random() * window.innerHeight + 'px';

  glitter.style.animationDuration = (1 + Math.random() * 2) + 's';

  document.body.appendChild(glitter);
}

  