import * as React from "react";

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function ContactEmailTemplate({
  name,
  email,
  phone,
  message,
}: ContactEmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        maxWidth: 560,
        margin: "0 auto",
        padding: 32,
        backgroundColor: "#ffffff",
        borderTop: "4px solid #FFD600",
      }}
    >
      <h1 style={{ fontSize: 20, color: "#000000", margin: "0 0 24px" }}>
        새로운 문의가 도착했습니다
      </h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e5e5",
                color: "#666666",
                width: 80,
                verticalAlign: "top",
              }}
            >
              이름
            </td>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e5e5",
                color: "#000000",
                fontWeight: 600,
              }}
            >
              {name}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e5e5",
                color: "#666666",
                width: 80,
                verticalAlign: "top",
              }}
            >
              이메일
            </td>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e5e5",
                color: "#000000",
                fontWeight: 600,
              }}
            >
              <a href={`mailto:${email}`} style={{ color: "#000000" }}>
                {email}
              </a>
            </td>
          </tr>
          {phone && (
            <tr>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e5e5",
                  color: "#666666",
                  width: 80,
                  verticalAlign: "top",
                }}
              >
                전화번호
              </td>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e5e5",
                  color: "#000000",
                  fontWeight: 600,
                }}
              >
                {phone}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: 24 }}>
        <p style={{ color: "#666666", margin: "0 0 8px" }}>문의 내용</p>
        <div
          style={{
            padding: 16,
            backgroundColor: "#f9f9f9",
            borderRadius: 8,
            color: "#000000",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
