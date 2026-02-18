import * as React from "react";

interface RequestEmailTemplateProps {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
}

export function RequestEmailTemplate({
  name,
  email,
  phone,
  topic,
  message,
}: RequestEmailTemplateProps) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "이름", value: name },
    {
      label: "이메일",
      value: <a href={`mailto:${email}`} style={{ color: "#000000" }}>{email}</a>,
    },
  ];

  if (phone) rows.push({ label: "전화번호", value: phone });
  if (topic) rows.push({ label: "주제", value: topic });

  const cellBase: React.CSSProperties = {
    padding: "12px 0",
    borderBottom: "1px solid #e5e5e5",
    verticalAlign: "top",
  };

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
        새로운 견적 요청이 도착했습니다
      </h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {rows.map(({ label, value }) => (
            <tr key={label}>
              <td style={{ ...cellBase, color: "#666666", width: 80 }}>{label}</td>
              <td style={{ ...cellBase, color: "#000000", fontWeight: 600 }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 24 }}>
        <p style={{ color: "#666666", margin: "0 0 8px" }}>내용</p>
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
