export default function About() {
    return (
      <div style={{ padding: '20px' }}>
        <h1>About Me</h1>
        <p>Hi! I'm a React developer learning routing and SPAs.</p>
        <p>This app demonstrates:</p>
        <ul>
          <li>Client-side routing (no page reload)</li>
          <li>URL parameters (/post/:id)</li>
          <li>Navigation between pages</li>
          <li>Active links highlighting</li>
          <li>404 error pages</li>
        </ul>
      </div>
    );
  }