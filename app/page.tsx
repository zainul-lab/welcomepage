"use client";
import { Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCardClick = (index: number) => {
    if (index === 4) {
      router.push("WelcomePage");
    }
  };

  return (
    <div style={{ display: "flex", gap: "24px", padding: "40px" }}>
      {["RDSP", "RESP", "TFSA", "RIF", "Partners"].map((num, idx) => (
        <Card
          key={num}
          style={{
            padding: "30px 24px",
            minWidth: "160px",
            cursor: "pointer",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}
          onClick={() => handleCardClick(idx)}
        >
           {num}
        </Card>
      ))}
       
    </div>
  );
}



