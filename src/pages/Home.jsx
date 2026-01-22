import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const isLoggedIn = Boolean(localStorage.getItem('access'));

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={7}>
              <Badge bg="secondary" className="mb-3">
                Simple habit tracking
              </Badge>

              <h1 className={styles.title}>Welcome to Momentum</h1>

              <p className={styles.subtitle}>
                Build habits that stick. Create a habit, track it daily, and
                stay consistent with a clean dashboard and quick updates.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                {isLoggedIn ? (
                  <Button as={Link} to="/dashboard" size="lg" variant="primary">
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      as={Link}
                      to="/register"
                      size="lg"
                      variant="primary"
                    >
                      Get Started
                    </Button>
                    <Button
                      as={Link}
                      to="/login"
                      size="lg"
                      variant="outline-light"
                    >
                      Log In
                    </Button>
                  </>
                )}
              </div>

              <p className={styles.microcopy}>
                No clutter. No gimmicks. Just habits and progress.
              </p>
            </Col>

            <Col lg={5}>
              {/* Decorative panel (no external assets, low-risk) */}
              <div className={styles.panel}>
                <div className={styles.panelInner}>
                  <div className={styles.fakeRow} />
                  <div className={styles.fakeRow} />
                  <div className={styles.fakeRowShort} />
                  <div className={styles.fakePills}>
                    <span className={styles.pill} />
                    <span className={styles.pill} />
                    <span className={styles.pill} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <Row className="g-3 mt-1">
            <Col md={4}>
              <Card className={styles.card}>
                <Card.Body>
                  <h3 className={styles.cardTitle}>1) Create</h3>
                  <p className={styles.cardText}>
                    Add a habit you want to build — keep it small and specific.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={styles.card}>
                <Card.Body>
                  <h3 className={styles.cardTitle}>2) Track</h3>
                  <p className={styles.cardText}>
                    Log your progress daily in seconds. Consistency beats
                    intensity.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={styles.card}>
                <Card.Body>
                  <h3 className={styles.cardTitle}>3) Improve</h3>
                  <p className={styles.cardText}>
                    Review what’s working and stay accountable to yourself.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURES */}
      <section className={styles.sectionAlt}>
        <Container>
          <h2 className={styles.sectionTitle}>Designed for focus</h2>
          <Row className="g-3 mt-1">
            <Col md={6} lg={3}>
              <Card className={styles.card}>
                <Card.Body>
                  <h3 className={styles.cardTitle}>Fast updates</h3>
                  <p className={styles.cardText}>
                    Create, edit, and track habits without friction.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className={styles.card}>
                <Card.Body>
                  <h3 className={styles.cardTitle}>Clear feedback</h3>
                  <p className={styles.cardText}>
                    Success and errors are shown clearly as you work.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className={styles.card}>
                <Card.Body>
                  <h3 className={styles.cardTitle}>Private by default</h3>
                  <p className={styles.cardText}>
                    Only you can edit or delete your own records.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className={styles.card}>
                <Card.Body>
                  <h3 className={styles.cardTitle}>Mobile-first</h3>
                  <p className={styles.cardText}>
                    Works cleanly on phones, tablets, and desktop.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className={styles.cta}>
        <Container className="text-center">
          <h2 className={styles.ctaTitle}>Start building momentum today</h2>
          <p className={styles.ctaText}>
            Create your first habit and track your progress in under a minute.
          </p>

          {!isLoggedIn && (
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <Button as={Link} to="/register" size="lg" variant="primary">
                Create Account
              </Button>
              <Button as={Link} to="/login" size="lg" variant="outline-light">
                Log In
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
