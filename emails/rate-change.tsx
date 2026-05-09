// Minimal React Email scaffold. Plain JSX (no @react-email/components).
// Returns an HTML-email-shaped tree intended to be rendered to static HTML
// and post-processed (e.g. {{HERO_IMAGE_URL}} substitution).

export type RateChangeEmailProps = {
  firstName?: string;
};

export default function RateChangeEmail({ firstName }: RateChangeEmailProps) {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Rates just changed</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#0A0E1A',
          fontFamily: 'Inter, Helvetica, Arial, sans-serif',
          color: '#F5F7FB',
        }}
      >
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ width: '100%', borderCollapse: 'collapse' }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: '32px 16px' }}>
                <table
                  role="presentation"
                  width="560"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    width: '560px',
                    maxWidth: '100%',
                    backgroundColor: '#121826',
                    borderRadius: '16px',
                    overflow: 'hidden',
                  }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src="{{HERO_IMAGE_URL}}"
                          alt="Rates just changed"
                          width="560"
                          style={{
                            display: 'block',
                            width: '100%',
                            height: 'auto',
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '32px' }}>
                        <h1
                          style={{
                            margin: '0 0 16px',
                            fontSize: '24px',
                            lineHeight: '32px',
                            fontWeight: 700,
                            color: '#FFFFFF',
                          }}
                        >
                          Rates just changed — your idle cash could be earning
                          more.
                        </h1>
                        <p
                          style={{
                            margin: '0 0 12px',
                            fontSize: '15px',
                            lineHeight: '24px',
                            color: '#C5CBD9',
                          }}
                        >
                          {greeting} we noticed savings rates moved this week,
                          and the account you’re using is no longer the best
                          option for the cash sitting in it.
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '15px',
                            lineHeight: '24px',
                            color: '#C5CBD9',
                          }}
                        >
                          Brick can move you to a higher-yield account in a
                          couple of taps. No paperwork, no minimums — just more
                          interest on the same money.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
