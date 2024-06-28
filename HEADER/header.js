function build_header(currentPage) {
   let html = `
    <header id="header" class="header d-flex align-items-center sticky-top">
      <div class="container-fluid position-relative d-flex align-items-center justify-content-between">

        <a href="index.html" class="logo d-flex align-items-center me-auto me-xl-0">
          <!-- Uncomment the line below if you also wish to use an image logo -->
          <!-- <img src="assets/img/logo.png" alt=""> -->
          <i class="bi bi-camera"></i>
          <h1 class="sitename">PhotoFolio</h1>
        </a>

        <nav id="navmenu" class="navmenu">
          <ul>
            <li><a href="index.html" class="${currentPage === 'index.json'?'active':''}">Home<br></a></li>
            <li><a href="about.html" class="${currentPage === 'about.json'?'active':''}">About</a></li>
            <li class="dropdown"><a href="gallery.html" class="${currentPage === 'gallery.json'?'active':''}"><span>Gallery</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="gallery.html">Nature</a></li>
                <li><a href="gallery.html">People</a></li>
                <li><a href="gallery.html">Architecture</a></li>
                <li><a href="gallery.html">Animals</a></li>
                <li><a href="gallery.html">Sports</a></li>
                <li><a href="gallery.html">Travel</a></li>
                <li class="dropdown"><a href="#"><span>Deep Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                  <ul>
                    <li><a href="#">Deep Dropdown 1</a></li>
                    <li><a href="#">Deep Dropdown 2</a></li>
                    <li><a href="#">Deep Dropdown 3</a></li>
                    <li><a href="#">Deep Dropdown 4</a></li>
                    <li><a href="#">Deep Dropdown 5</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="services.html" class="${currentPage === 'services.json'?'active':''}">Services</a></li>
            <li><a href="contact.html" class="${currentPage === 'contact.json'?'active':''}">Contact</a></li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <div class="header-social-links">
          <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>

      </div>
    </header>`;
    return html;
}

module.exports = { build_header }
