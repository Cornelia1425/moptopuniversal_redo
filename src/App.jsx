import { useMemo, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { interviews, showcaseVideos, students, teachers } from './data/content'

function HomePage() {
  return (
    <section className="home-page">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src="/images/opening_muted_output.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="home-logo-bg" aria-hidden="true" />
      <div className="hero-overlay">
        <div className="hero-bottom-row">
          <p className="hero-text">
            NYC street and social style dance training rooted in culture.
          </p>
          <NavLink to="/teachers" className="action-link hero-cta">
            Meet Directors
          </NavLink>
        </div>
      </div>
    </section>
  )
}

function DirectorsPage() {
  return (
    <section className="directors-page" aria-label="Directors">
      <div className="home-logo-bg" aria-hidden="true" />
      <div className="directors-row-wrap">
        <div className="directors-row">
          {teachers.map((teacher) => (
            <NavLink
              key={teacher.id}
              to={`/teachers/${teacher.slug}`}
              className="director-circle-link"
              title={teacher.name}
            >
              <img src={`/images/${teacher.profileImg}`} alt={teacher.name} className="director-circle-img" />
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function DirectorDetailPage() {
  const { slug } = useParams()
  const teacher = teachers.find((item) => item.slug === slug)

  if (!teacher) {
    return <Navigate to="/teachers" replace />
  }

  return (
    <section className="page">
      <h1>{teacher.name}</h1>
      <a href={teacher.instagram} target="_blank" rel="noreferrer" className="external-link">
        Open Instagram
      </a>
      <img src={`/images/${teacher.profileImg}`} alt={teacher.name} className="profile-image detail-profile" />
      <div className="class-images">
        {teacher.classImages.map((image) => (
          <img key={image} src={`/images/${image}`} alt={`${teacher.name} class`} className="class-image" />
        ))}
      </div>
    </section>
  )
}

function VideoPage({ title, videos }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(
    () => videos.filter((video) => video.title.toLowerCase().includes(query.toLowerCase())),
    [query, videos],
  )

  return (
    <section className="page">
      <h1>{title}</h1>
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search video"
      />
      <div className="video-grid">
        {filtered.map((video) => (
          <iframe
            key={video.id}
            src={video.url}
            title={video.title}
            className="video-frame"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ))}
      </div>
    </section>
  )
}

function StudentsPage() {
  const byYear = useMemo(() => {
    return students.reduce((accumulator, student) => {
      if (!accumulator[student.year]) {
        accumulator[student.year] = []
      }
      accumulator[student.year].push(student)
      return accumulator
    }, {})
  }, [])

  const years = Object.keys(byYear).sort()

  return (
    <section className="page">
      <h1>Students</h1>
      {years.map((year) => (
        <div key={year} className="student-year-group">
          <h2>{year}</h2>
          <div className="student-row">
            {byYear[year].map((student) => (
              <a key={student.id} href={student.instagram} target="_blank" rel="noreferrer" className="student-card">
                <img src={`/images/${student.image}`} alt={student.name} />
                <span>{student.name}</span>
                <small>From {student.country}</small>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

function ListenHerePage() {
  return (
    <section className="page">
      <h1>Listen Here</h1>
      <div className="playlist-grid">
        <article>
          <h2>House Music Gospel</h2>
          <iframe
            src="https://open.spotify.com/embed/playlist/03U5PFCbznOcmWd9E5EmFx?utm_source=generator&theme=0"
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="House music playlist"
          />
        </article>
        <article>
          <h2>Hip Hop Music Gospel</h2>
          <iframe
            src="https://open.spotify.com/embed/playlist/2mYRMzVzbS2mUEudfLSE64?utm_source=generator&theme=0"
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Hip hop music playlist"
          />
        </article>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-inner" href="https://www.peridance.com/moptop-about.cfm" target="_blank" rel="noreferrer">
        <img className="footer-logo" src="/images/peridance_logo_white.png" alt="Peridance — MOPTOP program info" />
      </a>
      <a className="footer-inner" href="https://www.36chambazofstylz.org/" target="_blank" rel="noreferrer">
        <img className="footer-logo" src="/images/chambaz_logo1.png" alt="36 Chambaz of Stylz" />
      </a>
      <a className="footer-inner" href="https://www.eliteforcecrew.com/" target="_blank" rel="noreferrer">
        <img className="footer-logo" src="/images/efc_logo.png" alt="Elite Force Crew" />
      </a>
      <a className="footer-inner" href="https://www.instagram.com/moptopuniversal/" target="_blank" rel="noreferrer">
        <img className="footer-logo" src="/images/ins_logo_white.png" alt="MOPTOP Universal on Instagram" />
      </a>
      <a className="footer-inner" href="https://www.youtube.com/@THEMOPTOPCHANNEL" target="_blank" rel="noreferrer">
        <img className="footer-logo" src="/images/youtube_logo_white.png" alt="The MOPTOP Channel on YouTube" />
      </a>
    </footer>
  )
}

function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-bar">
        <button
          type="button"
          className="nav-hamburger"
          aria-expanded={drawerOpen}
          aria-controls="site-drawer"
          onClick={() => setDrawerOpen((open) => !open)}
        >
          <span className="nav-hamburger-lines" aria-hidden="true" />
          <span className="visually-hidden">Menu</span>
        </button>
        <nav className="top-nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/teachers">Directors</NavLink>
          <NavLink to="/interviews">Interviews</NavLink>
          <NavLink to="/showcase">Showcase</NavLink>
          <NavLink to="/students">Students</NavLink>
        </nav>
      </div>
      <div
        id="site-drawer"
        className={`drawer-backdrop ${drawerOpen ? 'drawer-backdrop--open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && setDrawerOpen(false)}
        role="presentation"
      />
      <aside className={`site-drawer ${drawerOpen ? 'site-drawer--open' : ''}`} aria-hidden={!drawerOpen}>
        <NavLink to="/listen-here" onClick={() => setDrawerOpen(false)}>
          Listen Here
        </NavLink>
      </aside>
    </header>
  )
}

function App() {
  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<DirectorsPage />} />
          <Route path="/teachers/:slug" element={<DirectorDetailPage />} />
          <Route path="/directors" element={<Navigate to="/teachers" replace />} />
          <Route path="/directors/:slug" element={<DirectorDetailPage />} />
          <Route path="/interviews" element={<VideoPage title="Interviews" videos={interviews} />} />
          <Route path="/showcase" element={<VideoPage title="Showcase" videos={showcaseVideos} />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/listen-here" element={<ListenHerePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
